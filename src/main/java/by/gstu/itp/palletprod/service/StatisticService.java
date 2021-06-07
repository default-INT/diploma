package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.statistic.EmployeeStatisticDto;
import by.gstu.itp.palletprod.exception.NotFoundException;
import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.model.report.EmployeeItem;
import by.gstu.itp.palletprod.model.report.Report;
import by.gstu.itp.palletprod.repository.report.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Класс-сервис производящий взаимодействие с базой данных и управляет данными через репозиторий.
 * @author Evgeniy Trofimov
 */
@Service
public class StatisticService {
    private final ReportRepository reportRepository;

    public StatisticService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    private Map<Employee, List<EmployeeItem>> getStatisticOnDates(final LocalDate dateAfter, final LocalDate dateBefore) {
        final List<Report> reports = reportRepository.findAllByDateAfterAndDateBeforeOrderByDateDesc(dateAfter, dateBefore);
        final Map<Employee, List<EmployeeItem>> employeeItemsMap = new HashMap<>();
        reports.stream()
                .flatMap(report -> report.getEmployeeItems().stream())
                .forEach(employeeItem -> {
                    employeeItemsMap.computeIfAbsent(employeeItem.getEmployee(), k -> new ArrayList<>())
                            .add(employeeItem);
                });
        return employeeItemsMap;
    }

    public List<EmployeeStatisticDto> getEmployeeStatistic(final LocalDate dateAfter, final LocalDate dateBefore) {
        final Map<Employee, List<EmployeeItem>> employeeItemsMap = getStatisticOnDates(dateAfter, dateBefore);
        return employeeItemsMap.entrySet()
                .stream()
                .map(EmployeeStatisticDto::of)
                .collect(Collectors.toList());
    }

    public List<EmployeeStatisticDto> getEmployeeStatistic(final LocalDate dateAfter, final LocalDate dateBefore, String employeeId) {
        final Map<Employee, List<EmployeeItem>> employeeItemsMap = getStatisticOnDates(dateAfter, dateBefore);
        return employeeItemsMap.entrySet()
                .stream()
                .filter(employeeListEntry -> employeeListEntry.getKey().getId().equals(employeeId))
                .map(EmployeeStatisticDto::of)
                .collect(Collectors.toList());
    }
}
