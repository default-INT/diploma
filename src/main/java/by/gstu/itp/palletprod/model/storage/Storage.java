package by.gstu.itp.palletprod.model.storage;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "storages")
public class Storage {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "date_time_edit",nullable = false)
    private Instant dateTimeEdit;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "storage_id")
    private List<StorageItem> storageItems;

    @OneToOne(mappedBy = "storage")
    private UnloadingEvent unloadingEvent;

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

    public List<StorageItem> getStorageItems() {
        return storageItems;
    }

    public void setStorageItems(List<StorageItem> storageItems) {
        this.storageItems = storageItems;
    }

    public UnloadingEvent getUnloadingEvent() {
        return unloadingEvent;
    }

    public void setUnloadingEvent(UnloadingEvent unloadingEvent) {
        this.unloadingEvent = unloadingEvent;
    }
}
