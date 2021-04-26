package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.storage.StorageDto;
import by.gstu.itp.palletprod.dto.storage.StorageItemDto;
import by.gstu.itp.palletprod.exception.NotFoundStorageWriteException;
import by.gstu.itp.palletprod.model.storage.Storage;
import by.gstu.itp.palletprod.model.storage.StorageItem;
import by.gstu.itp.palletprod.repository.storage.StorageRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StorageService {
    private final StorageRepository storageRepository;

    public StorageService(StorageRepository storageRepository) {
        this.storageRepository = storageRepository;
    }

    public StorageDto getActualStorageData() {
        final Storage storageWrite = storageRepository.findTopByOrderByDateTimeEditDesc()
                .orElseThrow(NotFoundStorageWriteException::new);
        return StorageDto.of(storageWrite);
    }

    //TODO: will fix deleting (trouble with date asc|dsc)
    public StorageDto deleteItem(List<StorageItemDto> storageItemsDto) {
        final Storage storageWrite = storageRepository.findTopByOrderByDateTimeEditDesc()
                .orElseThrow(NotFoundStorageWriteException::new);
        final List<StorageItem> storageItems = storageWrite.getStorageItems();
        final List<StorageItem> updateStoreItems = storageItems.
                stream()
                .map(storageItem -> {
                    final StorageItem newStorageItem = storageItem.copy();
                    final Optional<StorageItemDto> storageItemDto = storageItemsDto.stream()
                            .filter(stItemDto -> stItemDto.getPositionId().equals(storageItem.getPositionId()))
                            .findFirst();
                    if (storageItemDto.isEmpty()) return newStorageItem;
                    newStorageItem.setCount(storageItem.getCount() - storageItemDto.get().getCount());
                    return newStorageItem;
                })
                .filter(storageItem -> storageItem.getCount() > 0)
                .collect(Collectors.toList());
        final Storage newStore = new Storage();
        newStore.setDateTimeEdit(Instant.now());
        newStore.setStorageItems(updateStoreItems);

        storageRepository.save(newStore);

        return StorageDto.of(newStore);
    }
}
