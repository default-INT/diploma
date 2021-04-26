package by.gstu.itp.palletprod.model.storage;

import by.gstu.itp.palletprod.model.Position;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "storage_items")
public class StorageItem {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "position_id", updatable = false, insertable = false)
    private String positionId;
    @Column(name = "storage_id", updatable = false, insertable = false)
    private String storageId;
    @Column(nullable = false)
    private int count;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;

    @ManyToOne
    @JoinColumn(name = "storage_id")
    private Storage storage;

    public StorageItem copy() {
        final StorageItem storageItem = new StorageItem();
        storageItem.setPosition(position);
        storageItem.setCount(count);
        storageItem.setPositionId(positionId);
        return storageItem;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
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

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
}
