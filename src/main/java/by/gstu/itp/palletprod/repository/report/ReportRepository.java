package by.gstu.itp.palletprod.repository.report;

import by.gstu.itp.palletprod.model.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

/**
 * Интерфейс описывающий операции с БД по определённым критериям.
 * Доступ к данным реализует SpringData.
 * @author Evgeniy Trofimov
 */
public interface ReportRepository extends JpaRepository<Report, String> {
    List<Report> findAllByOrderByDateDesc();
    List<Report> findAllByDateAfterAndDateBeforeOrderByDateDesc(LocalDate dateAfter, LocalDate dateBefore);
    boolean existsByDate(LocalDate date);
    void deleteById(String id);
}
