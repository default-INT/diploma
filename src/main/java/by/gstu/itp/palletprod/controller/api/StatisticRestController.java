package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.statistic.EmployeeStatisticDto;
import by.gstu.itp.palletprod.service.StatisticService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Класс-контроллер возвращающий данные о бизнес-процессах предприятия.
 * @author Evgeniy Trofimov
 */
@RestController
@RequestMapping("/stat")
public class StatisticRestController {
    private final static DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final StatisticService statisticService;

    public StatisticRestController(StatisticService statisticService) {
        this.statisticService = statisticService;
    }

    @GetMapping("/employees")
    public List<EmployeeStatisticDto> getEmployeeStatistic(@RequestParam(name = "dateAfter") String dateAfter,
                                                           @RequestParam(name = "dateBefore") String dateBefore,
                                                           @RequestParam(name = "employeeId", required = false) String employeeId) {

        final LocalDate date1 = LocalDate.from(DATE_TIME_FORMATTER.parse(dateAfter));
        final LocalDate date2 = LocalDate.from(DATE_TIME_FORMATTER.parse(dateBefore));

        if (employeeId != null && !employeeId.isEmpty()) {
            return statisticService.getEmployeeStatistic(date1.minusDays(1), date2.plusDays(1), employeeId);
        }

        return statisticService.getEmployeeStatistic(date1, date2);
    }
}
