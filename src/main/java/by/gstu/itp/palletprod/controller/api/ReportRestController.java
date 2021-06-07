package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.report.ReportDto;
import by.gstu.itp.palletprod.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Класс-контроллер для взаимодействия с данными об отчётах.
 * @author Evgeniy Trofimov
 */
@RestController
@RequestMapping("/reports")
public class ReportRestController {
    private final ReportService reportService;

    public ReportRestController(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * Возвращает все отчёты из базы данных.
     * @param size {int}
     * @param page {int}
     * @return List<ReportDto>
     */
    @GetMapping
    public List<ReportDto> findAll(@RequestParam(name = "size", defaultValue = "0") int size,
                                   @RequestParam(name = "page", defaultValue = "1") int page) {
        --page;
        if (size <= 0) {
            size = 10;
        }
        return reportService.findAll();
    }

    /**
     * Возвращает все данные об отчётах по определённому месяцу и году.
     * @param month {int}
     * @param year {int}
     * @return List<ReportDto>
     */
    @GetMapping("/week")
    public List<ReportDto> findAllByMonthAndYear(@RequestParam(name = "month") int month,
                                                 @RequestParam(name = "year") int year) {
        return reportService.findAllMonthAndYear(month, year);
    }

    /**
     * Обновляет данные об отчёте.
     * @param reportDto {ReportDto}
     * @return ReportDto
     */
    @PutMapping
    public ReportDto update(@RequestBody ReportDto reportDto) {
        return reportService.update(reportDto);
    }

    /**
     * Добавляет отчёт в БД, через сервис.
     * @param reportDto {ReportDto}
     * @return ReportDto
     */
    @PostMapping
    public ReportDto add(@RequestBody ReportDto reportDto) {
        return reportService.add(reportDto);
    }

    /**
     * Удаляет данные об отчёте из БД по reportId
     * @param reportId
     * @return
     */
    @DeleteMapping("{reportId}")
    public boolean delete(@PathVariable String reportId) {
        return reportService.delete(reportId);
    }
}
