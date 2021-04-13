package by.gstu.itp.palletprod.repository.report;

import by.gstu.itp.palletprod.model.report.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDate;

public interface ReportRepository extends JpaRepository<Report, String>, PagingAndSortingRepository<Report, String> {
    Page<Report> findAll(Pageable pageRequest);
    boolean existsByDate(LocalDate date);
    void deleteById(String id);
}
