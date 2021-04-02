package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.PositionDto;
import by.gstu.itp.palletprod.model.Position;
import by.gstu.itp.palletprod.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PositionService {
    private final PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    public List<PositionDto> findAll() {
        return positionRepository.findAllByDeletedFalse()
                .stream().map(PositionDto::of)
                .collect(Collectors.toList());
    }

    public List<PositionDto> findAllDeleted() {
        return positionRepository.findAllByDeletedTrue()
                .stream().map(PositionDto::of)
                .collect(Collectors.toList());
    }

    public PositionDto add(final PositionDto positionDto) {
        return PositionDto.of(positionRepository.save(Position.of(positionDto)));
    }

    public PositionDto update(final PositionDto positionDto) {
        final Position position = positionRepository.findById(positionDto.getId())
                .orElseThrow(IllegalArgumentException::new);

        position.setName(positionDto.getName());
        position.setItemTariff(positionDto.getItemTariff());
        position.setItemName(positionDto.getItemName());
        position.setPallet(positionDto.isPallet());
        position.setStorage(positionDto.isStorage());

        return PositionDto.of(positionRepository.save(position));
    }

    public boolean delete(final PositionDto positionDto) {
        final Position position = positionRepository.findById(positionDto.getId())
                .orElseThrow(IllegalArgumentException::new);

        position.setDeleted(true);

        return positionRepository.save(position).isDeleted();
    }
}
