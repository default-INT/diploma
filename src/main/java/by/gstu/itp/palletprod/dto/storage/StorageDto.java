package by.gstu.itp.palletprod.dto.storage;

import by.gstu.itp.palletprod.model.storage.Storage;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

public class StorageDto {
    public static StorageDto of(Storage storage) {
        final StorageDto storageDto = new StorageDto();

        storageDto.setId(storage.getId());
        storageDto.setDateTimeEdit(storage.getDateTimeEdit());
        storageDto.setStorageItems(
            storage.getStorageItems()
                .stream()
                .map(StorageItemDto::of)
                .collect(Collectors.toList())
        );

        return storageDto;
    }

    private String id;
    private Instant dateTimeEdit;

    private List<StorageItemDto> storageItems;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getDateTimeEdit() {
        return dateTimeEdit;
    }

    public void setDateTimeEdit(Instant dateTimeEdit) {
        this.dateTimeEdit = dateTimeEdit;
    }

    public List<StorageItemDto> getStorageItems() {
        return storageItems;
    }

    public void setStorageItems(List<StorageItemDto> storageItems) {
        this.storageItems = storageItems;
    }
}
