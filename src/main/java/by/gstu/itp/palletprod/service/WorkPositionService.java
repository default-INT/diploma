package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.WorkPositionDto;
import by.gstu.itp.palletprod.model.WorkPosition;
import by.gstu.itp.palletprod.repository.WorkPositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkPositionService {
    private final WorkPositionRepository workPositionRepository;

    public WorkPositionService(WorkPositionRepository workPositionRepository) {
        this.workPositionRepository = workPositionRepository;
    }

    public List<WorkPositionDto> findAll() {
        return workPositionRepository.findAll()
                .stream()
                .map(WorkPositionDto::of)
                .collect(Collectors.toList());
    }

    public WorkPositionDto add(final WorkPositionDto workPositionDto) {
        return WorkPositionDto.of(workPositionRepository.save(WorkPosition.of(workPositionDto)));
    }

    public WorkPositionDto update(final WorkPositionDto workPositionDto) {
        final WorkPosition updateWorkPosition = workPositionRepository.findById(workPositionDto.getId())
                .orElseThrow(IllegalArgumentException::new); //TODO: NotFoundEntityByIdException

        updateWorkPosition.setName(workPositionDto.getName());
        updateWorkPosition.setItemName(workPositionDto.getItemName());
        updateWorkPosition.setItemTariff(workPositionDto.getItemTariff());

        return WorkPositionDto.of(workPositionRepository.save(updateWorkPosition));
    }

    public void delete (final WorkPositionDto workPositionDto) {
        deleteById(workPositionDto.getId());
    }

    public void deleteById(final String id) {
        workPositionRepository.deleteById(id);
    }
}
