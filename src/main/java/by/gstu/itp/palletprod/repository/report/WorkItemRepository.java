package by.gstu.itp.palletprod.repository.report;

import by.gstu.itp.palletprod.model.report.WorkItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkItemRepository extends JpaRepository<WorkItem, String> {
}
