package by.gstu.itp.palletprod.dto.storage;

import by.gstu.itp.palletprod.model.storage.StorageItem;

public class StorageItemDto {
    public static StorageItemDto of(StorageItem storageItem) {
        final StorageItemDto storageItemDto = new StorageItemDto();

        storageItemDto.setId(storageItem.getId());
        storageItemDto.setPositionId(storageItem.getPositionId());
        storageItemDto.setStorageId(storageItem.getStorageId());
        storageItemDto.setCount(storageItem.getCount());

        storageItemDto.setPositionName(storageItem.getPosition().getName());

        return storageItemDto;
    }

    private String id;
    private String positionId;
    private String storageId;
    private String positionName;
    private int count;

    public StorageItemDto() {

    }

    public StorageItemDto(int count, String positionId) {
        this.count = count;
        this.positionId = positionId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public String getStorageId() {
        return storageId;
    }

    public void setStorageId(String storageId) {
        this.storageId = storageId;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }
}
