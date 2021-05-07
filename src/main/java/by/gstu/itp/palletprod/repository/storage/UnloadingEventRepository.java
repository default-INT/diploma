package by.gstu.itp.palletprod.repository.storage;

import by.gstu.itp.palletprod.model.storage.UnloadingEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnloadingEventRepository extends JpaRepository<UnloadingEvent, String> {
    //findTopByOrderByDateTimeEditDesc
    List<UnloadingEvent> findAllByOrderByUnloadingDateTimeDesc();
}
