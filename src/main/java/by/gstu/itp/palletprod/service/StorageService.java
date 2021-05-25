package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.storage.StorageDto;
import by.gstu.itp.palletprod.dto.storage.StorageItemDto;
import by.gstu.itp.palletprod.exception.NotFoundException;
import by.gstu.itp.palletprod.exception.NotFoundStorageWriteException;
import by.gstu.itp.palletprod.model.report.DayStat;
import by.gstu.itp.palletprod.model.report.Report;
import by.gstu.itp.palletprod.model.storage.Storage;
import by.gstu.itp.palletprod.model.storage.StorageItem;
import by.gstu.itp.palletprod.model.storage.UnloadingEvent;
import by.gstu.itp.palletprod.model.storage.UnloadingItem;
import by.gstu.itp.palletprod.repository.PositionRepository;
import by.gstu.itp.palletprod.repository.storage.StorageRepository;
import by.gstu.itp.palletprod.repository.storage.UnloadingEventRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.function.BinaryOperator;
import java.util.stream.Collectors;

@Service
public class StorageService {

    private final StorageRepository storageRepository;
    private final PositionRepository positionRepository;
    private final UnloadingEventRepository unloadingEventRepository;

    public StorageService(StorageRepository storageRepository, PositionRepository positionRepository, UnloadingEventRepository unloadingEventRepository) {
        this.storageRepository = storageRepository;
        this.positionRepository = positionRepository;
        this.unloadingEventRepository = unloadingEventRepository;
    }

    public StorageDto getActualStorageData() {
        final Storage storageWrite = storageRepository.findTopByOrderByDateTimeEditDesc()
                .orElseThrow(NotFoundStorageWriteException::new);
        return StorageDto.of(storageWrite);
    }

    public List<StorageItemDto> datStatMapToStorageItem(List<DayStat> dayStats) {
        return dayStats.stream()
                .filter(dayStat -> dayStat.getPosition().isStorage())
                .map(dayStat -> new StorageItemDto(dayStat.getTotalNum(), dayStat.getPositionId()))
                .collect(Collectors.toList());
    }

    public StorageDto addItems(Report report) {
        return addItems(
                datStatMapToStorageItem(report.getDayStats())
        );
    }

    public StorageDto addItems(List<StorageItemDto> storageItems) {
        final Storage storage = new Storage();
        final Storage storageWrite = storageRepository.findTopByOrderByDateTimeEditDesc()
                .orElse(Storage.getEmpty());

        final List<StorageItem> updateStorageItems = getActualStorageItems(storageWrite.getStorageItems(), storageItems, Integer::sum);
        storage.setStorageItems(updateStorageItems);
        storage.setDateTimeEdit(Instant.now());

        return StorageDto.of(storageRepository.save(storage));
    }

    // TODO: edit logic
    public List<StorageItem> getActualStorageItems(List<StorageItem> actualStorageItems, List<StorageItemDto> storageItemsDto,
                                                   BinaryOperator<Integer> func) {
        final Map<String, StorageItem> stringStorageItemHashMap = actualStorageItems.stream()
                .collect(Collectors.toMap(StorageItem::getPositionId, StorageItem::copy));
        storageItemsDto
                .forEach(storageItemDto -> {
                    final Optional<StorageItem> storageItem = actualStorageItems
                            .stream()
                            .filter(stItem -> stItem.getPositionId().equals(storageItemDto.getPositionId()))
                            .findFirst();
                    StorageItem newStorageItem;
                    if (storageItem.isEmpty()) {
                        newStorageItem = new StorageItem();

                        newStorageItem.setPosition(positionRepository.findById(storageItemDto.getPositionId())
                                .orElseThrow(NotFoundException::new));
                        newStorageItem.setCount(storageItemDto.getCount());
                        stringStorageItemHashMap.put(storageItemDto.getPositionId(), newStorageItem);
                    } else {
                        stringStorageItemHashMap.get(storageItemDto.getPositionId())
                                .setCount(func.apply(storageItem.get().getCount(), storageItemDto.getCount()));
                    }
                });
        return new ArrayList<>(stringStorageItemHashMap.values());
    }

    public StorageDto deleteItems(final StorageDto storageDto) {
        final List<StorageItemDto> storageItemsDto = storageDto.getStorageItems();

        final Storage storageWrite = storageRepository.findTopByOrderByDateTimeEditDesc()
                .orElseThrow(NotFoundStorageWriteException::new);
        final List<StorageItem> storageItems = storageWrite.getStorageItems();
        final List<StorageItem> updateStoreItems = getActualStorageItems(storageItems, storageItemsDto, (a, b) -> a - b);
        final Storage newStore = new Storage();
        newStore.setDateTimeEdit(Instant.now());
        newStore.setStorageItems(updateStoreItems);

        final UnloadingEvent unloadingEvent = new UnloadingEvent();

        unloadingEvent.setStorage(newStore);
        unloadingEvent.setUnloadingDateTime(storageDto.getDateTimeEdit());
        unloadingEvent.setUnloadingItems(
                storageItemsDto.stream()
                    .map(this::storageItemMapToUnloadingItem)
                    .collect(Collectors.toList())
        );

        storageRepository.save(newStore);

        final UnloadingEvent newUnloadingEvent = unloadingEventRepository.save(unloadingEvent);

        return StorageDto.of(newUnloadingEvent);
    }

    public List<StorageDto> findAllUnloadingEvents() {
        final List<UnloadingEvent> unloadingEvents = unloadingEventRepository.findAllByOrderByUnloadingDateTimeDesc();

        return unloadingEvents.stream()
                .map(StorageDto::of)
                .collect(Collectors.toList());
    }

    public boolean deleteUnloadingEvent(String unloadingEventId) {
        try {
            unloadingEventRepository.deleteById(unloadingEventId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private UnloadingItem storageItemMapToUnloadingItem(final StorageItemDto storageItemDto) {
        final UnloadingItem unloadingItem = new UnloadingItem();
        unloadingItem.setPositionId(storageItemDto.getPositionId());
        unloadingItem.setPosition(positionRepository.findById(storageItemDto.getPositionId())
                .orElseThrow(NotFoundException::new));
        unloadingItem.setCount(storageItemDto.getCount());
        return unloadingItem;
    }
}
