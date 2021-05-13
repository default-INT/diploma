package by.gstu.itp.palletprod.model.storage;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "unloading_events")
public class UnloadingEvent {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "unloading_date_time")
    private Instant unloadingDateTime;
    @Column(name = "storage_id", updatable = false, insertable = false)
    private String storageId;

    @OneToOne
    @JoinColumn(name = "storage_id", referencedColumnName = "id")
    private Storage storage;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "unloading_event_id")
    private List<UnloadingItem> unloadingItems;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getUnloadingDateTime() {
        return unloadingDateTime;
    }

    public void setUnloadingDateTime(Instant unloadingDateTime) {
        this.unloadingDateTime = unloadingDateTime;
    }

    public String getStorageId() {
        return storageId;
    }

    public void setStorageId(String storageId) {
        this.storageId = storageId;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public List<UnloadingItem> getUnloadingItems() {
        return unloadingItems;
    }

    public void setUnloadingItems(List<UnloadingItem> unloadingItems) {
        this.unloadingItems = unloadingItems;
    }
}
