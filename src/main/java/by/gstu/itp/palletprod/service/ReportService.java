package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.report.ReportDto;
import by.gstu.itp.palletprod.exception.ExistsReportDateException;
import by.gstu.itp.palletprod.model.Employee;
import by.gstu.itp.palletprod.model.Position;
import by.gstu.itp.palletprod.model.report.DayStat;
import by.gstu.itp.palletprod.model.report.EmployeeItem;
import by.gstu.itp.palletprod.model.report.Report;
import by.gstu.itp.palletprod.model.report.WorkItem;
import by.gstu.itp.palletprod.repository.EmployeeRepository;
import by.gstu.itp.palletprod.repository.PositionRepository;
import by.gstu.itp.palletprod.repository.report.ReportRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final PositionRepository positionRepository;
    private final EmployeeRepository employeeRepository;

    public ReportService(ReportRepository reportRepository, PositionRepository positionRepository,
                         EmployeeRepository employeeRepository) {
        this.reportRepository = reportRepository;
        this.positionRepository = positionRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<ReportDto> findAllMonthAndYear(final int month, final int year) {
        LocalDate dateAfter = LocalDate.of(year, month, 1).minusDays(1);
        LocalDate dateBefore = dateAfter.plusDays(1).plusMonths(1);
        return reportRepository.findAllByDateAfterAndDateBefore(dateAfter, dateBefore)
                .stream()
                .map(ReportDto::of)
                .collect(Collectors.toList());
    }

    public List<ReportDto> findAll(final int page, final int size) {
        if (size > 20 || size < 0) {
            throw new IllegalArgumentException("Limit is too much");
        }

        if (size == 0) {
            return Collections.emptyList();
        }
        return reportRepository
                .findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date")))
                .map(ReportDto::of)
                .toList();
    }

    public ReportDto update(final ReportDto reportDto) {
        final Report report = reportRepository.findById(reportDto.getId())
                .orElseThrow(IllegalArgumentException::new);
        if (!report.getDate().isEqual(reportDto.getDate()) && reportRepository.existsByDate(reportDto.getDate())) {
            throw new ExistsReportDateException();
        }
        delete(reportDto.getId());

        final Report updateReport = calculateActualReport(reportDto);

        return ReportDto.of(reportRepository.save(updateReport));
    }

    public boolean delete(final ReportDto reportDto) {
        return delete(reportDto.getId());
    }

    public boolean delete(final String reportId) {
        try {
            reportRepository.deleteById(reportId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public ReportDto add(final ReportDto reportDto) {
        if (reportRepository.existsByDate(reportDto.getDate())) {
            throw new ExistsReportDateException();
        }
        final Report report = calculateActualReport(reportDto);

        return ReportDto.of(reportRepository.save(report));
    }

    private Report calculateActualReport(final ReportDto reportDto) {
        final Report report = Report.of(reportDto);

        final Map<Position, DayStat> dayStatMap = new HashMap<>();

        final List<EmployeeItem> employeeItems = report.getEmployeeItems().stream().peek(employeeItem -> {
            final Employee employee = employeeRepository.findById(employeeItem.getEmployeeId())
                    .orElseThrow(IllegalArgumentException::new);
            employeeItem.setEmployee(employee);

            final List<WorkItem> workItems = employeeItem.getWorkItems().stream().peek(workItem -> {

                final BigDecimal itemNum = new BigDecimal(workItem.getItemNum());
                final Position position = positionRepository.findById(workItem.getPositionId())
                        .orElseThrow(IllegalArgumentException::new);
                workItem.setPosition(position);
                workItem.setSalary(workItem.getPosition().getItemTariff().multiply(itemNum));

                if (!dayStatMap.containsKey(workItem.getPosition())) {
                    final DayStat dayStat = new DayStat();
                    dayStat.setPositionId(workItem.getPositionId());
                    dayStat.setPosition(workItem.getPosition());
                    dayStat.setTotalNum(0);
                    dayStat.setTotalSalary(new BigDecimal(0));

                    dayStatMap.put(dayStat.getPosition(), dayStat);
                }

                final DayStat dayStat = dayStatMap.get(workItem.getPosition());
                dayStat.setTotalNum(dayStat.getTotalNum() + workItem.getItemNum());
                dayStat.setTotalSalary(dayStat.getTotalSalary().add(workItem.getSalary()));

            }).collect(Collectors.toList());
            employeeItem.setWorkItems(workItems);

            final BigDecimal totalSalary = workItems.stream()
                    .map(WorkItem::getSalary)
                    .reduce(BigDecimal::add)
                    .orElseThrow(IllegalStateException::new);

            employeeItem.setTotalSalary(totalSalary);
        }).collect(Collectors.toList());

        report.setEmployeeItems(employeeItems);
        report.setDayStats(new ArrayList<>(dayStatMap.values()));
        report.setTotalSalary(
                report.getDayStats().stream().map(DayStat::getTotalSalary)
                        .reduce(BigDecimal::add).orElse(new BigDecimal(0))
        );
        return report;
    }
}
