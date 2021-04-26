package by.gstu.itp.palletprod.repository.storage;

import by.gstu.itp.palletprod.model.storage.Storage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, String> {
    Optional<Storage> findTopByOrderByDateTimeEditDesc();
}
