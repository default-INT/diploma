package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.report.ReportDto;
import by.gstu.itp.palletprod.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportRestController {
    private final ReportService reportService;

    public ReportRestController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public List<ReportDto> findAll(@RequestParam(name = "size", defaultValue = "0") int size,
                                   @RequestParam(name = "page", defaultValue = "1") int page) {
        --page;
        if (size <= 0) {
            size = 10;
        }
        return reportService.findAll(page, size);
    }

    @GetMapping("/week")
    public List<ReportDto> findAllByMonthAndYear(@RequestParam(name = "month") int month,
                                                 @RequestParam(name = "year") int year) {
        return reportService.findAllMonthAndYear(month, year);
    }

    @PutMapping
    public ReportDto update(@RequestBody ReportDto reportDto) {
        return reportService.update(reportDto);
    }

    @PostMapping
    public ReportDto add(@RequestBody ReportDto reportDto) {
        return reportService.add(reportDto);
    }

    @DeleteMapping
    public boolean delete(@RequestBody ReportDto reportDto) {
        return reportService.delete(reportDto);
    }
}
