package by.gstu.itp.palletprod.repository;

import by.gstu.itp.palletprod.model.Token;
import by.gstu.itp.palletprod.model.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<Token, Long> {
    Optional<Token> findByUser(User user);
    boolean existsByUserIdAndAccessJws(String userId, String accessJws);
}
