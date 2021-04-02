package by.gstu.itp.palletprod.repository;

import by.gstu.itp.palletprod.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PositionRepository extends JpaRepository<Position, String> {
    List<Position> findAllByDeletedFalse();
    List<Position> findAllByDeletedTrue();
}
