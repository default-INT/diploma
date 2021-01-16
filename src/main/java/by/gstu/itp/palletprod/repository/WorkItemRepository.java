package by.gstu.itp.palletprod.repository;

import by.gstu.itp.palletprod.model.WorkItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkItemRepository extends JpaRepository<WorkItem, String> {
}
