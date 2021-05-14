package by.gstu.itp.palletprod.controller.api;

import by.gstu.itp.palletprod.dto.PositionDto;
import by.gstu.itp.palletprod.service.PositionService;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole(T(by.gstu.itp.palletprod.model.user.Role).ROLE_ADMIN)")
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

    @DeleteMapping
    public boolean delete(@RequestBody PositionDto positionDto) {
        return positionService.delete(positionDto);
    }
}
