package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.storage.StorageDto;
import by.gstu.itp.palletprod.dto.storage.StorageItemDto;
import by.gstu.itp.palletprod.exception.NotFoundException;
import by.gstu.itp.palletprod.exception.NotFoundStorageWriteException;
import by.gstu.itp.palletprod.model.report.DayStat;
import by.gstu.itp.palletprod.model.report.Report;
import by.gstu.itp.palletprod.model.storage.Storage;
import by.gstu.itp.palletprod.model.storage.StorageItem;
import by.gstu.itp.palletprod.repository.PositionRepository;
import by.gstu.itp.palletprod.repository.storage.StorageRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.function.BinaryOperator;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class StorageService {
    private final StorageRepository storageRepository;
    private final PositionRepository positionRepository;

    public StorageService(StorageRepository storageRepository, PositionRepository positionRepository) {
        this.storageRepository = storageRepository;
        this.positionRepository = positionRepository;
    }

    public StorageDto getActualStorageData() {
        final Storage storageWrite = storageRepository.findTopByOrderByDateTimeEditDesc()
                .orElseThrow(NotFoundStorageWriteException::new);
        return StorageDto.of(storageWrite);
    }

    public List<StorageItemDto> datStatMapToStorageItem(List<DayStat> dayStats) {
        return dayStats.stream()
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
                .orElseThrow(NotFoundStorageWriteException::new);

        final List<StorageItem> updateStorageItems = getActualStorageItems(storageWrite.getStorageItems(), storageItems, Integer::sum);
        storage.setStorageItems(updateStorageItems);
        storage.setDateTimeEdit(Instant.now());

        return StorageDto.of(storageRepository.save(storage));
    }

    public StorageDto deleteItems(Report report) {
        return deleteItems(
                datStatMapToStorageItem(report.getDayStats())
        );
    }

    public List<StorageItem> getActualStorageItems(List<StorageItem> actualStorageItems, List<StorageItemDto> storageItemsDto,
                                                   BinaryOperator<Integer> func) {
        final Map<String, StorageItem> stringStorageItemHashMap = actualStorageItems.stream()
                .collect(Collectors.toMap(StorageItem::getPositionId, storageItem -> storageItem));
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
                        stringStorageItemHashMap.put(storageItemDto.getStorageId(), newStorageItem);
                    } else {
                        stringStorageItemHashMap.get(storageItemDto.getPositionId())
                                .setCount(func.apply(storageItem.get().getCount(), storageItemDto.getCount()));
                    }
                });
        return new ArrayList<>(stringStorageItemHashMap.values());
    }

    //TODO: will fix deleting (trouble with date asc|dsc)
    public StorageDto deleteItems(List<StorageItemDto> storageItemsDto) {
        final Storage storageWrite = storageRepository.findTopByOrderByDateTimeEditDesc()
                .orElseThrow(NotFoundStorageWriteException::new);
        final List<StorageItem> storageItems = storageWrite.getStorageItems();
        final List<StorageItem> updateStoreItems = getActualStorageItems(storageItems, storageItemsDto, (a, b) -> a - b);
        final Storage newStore = new Storage();
        newStore.setDateTimeEdit(Instant.now());
        newStore.setStorageItems(updateStoreItems);

        storageRepository.save(newStore);

        return StorageDto.of(newStore);
    }
}
