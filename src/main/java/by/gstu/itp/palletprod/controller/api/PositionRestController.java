package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.PositionDto;
import by.gstu.itp.palletprod.service.PositionService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/positions")
public class PositionRestController {
    private final PositionService positionService;

    public PositionRestController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping
    public List<PositionDto> findAll(@RequestParam(name = "deleted", defaultValue = "false") boolean deleted) {
        if (deleted) {
            return positionService.findAllDeleted();
        }
        return positionService.findAll();
    }

    @PostMapping
    public PositionDto add(@RequestBody @Valid PositionDto positionDto) {
        return positionService.add(positionDto);
    }

    @PutMapping
    public PositionDto update(@RequestBody @Valid PositionDto positionDto) {
        return positionService.update(positionDto);
    }

    @DeleteMapping("{positionId}")
    public boolean delete(@PathVariable String positionId) {
        return positionService.delete(positionId);
    }
}
