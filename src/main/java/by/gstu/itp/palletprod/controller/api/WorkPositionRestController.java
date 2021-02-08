package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.WorkPositionDto;
import by.gstu.itp.palletprod.exception.DataValidationException;
import by.gstu.itp.palletprod.service.WorkPositionService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/work-positions")
public class WorkPositionRestController {
    private final WorkPositionService workPositionService;

    public WorkPositionRestController(WorkPositionService workPositionService) {
        this.workPositionService = workPositionService;
    }

    @GetMapping
    public List<WorkPositionDto> findAll() {
        return workPositionService.findAll();
    }

    @PostMapping
    public WorkPositionDto addWorkPosition(@RequestBody @Valid WorkPositionDto workPositionDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new DataValidationException(bindingResult);
        }
        return workPositionService.add(workPositionDto);
    }

    @PutMapping
    public WorkPositionDto updateWorkPosition(@RequestBody @Valid WorkPositionDto workPositionDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new DataValidationException(bindingResult);
        }
        return workPositionService.update(workPositionDto);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteWorkPosition(@RequestBody WorkPositionDto workPositionDto) {
        workPositionService.delete(workPositionDto);
        return ResponseEntity.ok("Delete work position is successful");
    }
}
