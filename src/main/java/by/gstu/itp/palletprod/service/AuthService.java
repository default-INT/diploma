package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.AuthenticationDto;
import by.gstu.itp.palletprod.model.user.Role;
import by.gstu.itp.palletprod.model.user.User;
import by.gstu.itp.palletprod.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User regEmployeeUser(AuthenticationDto authenticationDto) {
        final User user = new User();
        user.setEmail(authenticationDto.getEmail());
        user.setPassword(passwordEncoder.encode(authenticationDto.getPassword()));
        user.setEmployeeId(authenticationDto.getEmployeeId());
        user.setRole(Role.EMPLOYEE);
        return userRepository.save(user);
    }
}
