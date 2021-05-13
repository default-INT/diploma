package by.gstu.itp.palletprod.model.storage;

import by.gstu.itp.palletprod.dto.storage.StorageItemDto;
import by.gstu.itp.palletprod.model.Position;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "unloading_items")
public class UnloadingItem {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "position_id")
    private String positionId;
    @Column(name = "unloading_event_id", updatable = false, insertable = false)
    private String unloadingEventId;
    @Column(nullable = false)
    private int count;

    @ManyToOne
    @JoinColumn(name = "position_id", updatable = false, insertable = false)
    private Position position;

    @OneToOne
    @JoinColumn(name = "unloading_event_id", referencedColumnName = "id")
    private UnloadingEvent unloadingEvent;

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

    public String getUnloadingEventId() {
        return unloadingEventId;
    }

    public void setUnloadingEventId(String unloadingEventId) {
        this.unloadingEventId = unloadingEventId;
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

    public UnloadingEvent getUnloadingEvent() {
        return unloadingEvent;
    }

    public void setUnloadingEvent(UnloadingEvent unloadingEvent) {
        this.unloadingEvent = unloadingEvent;
    }
}
