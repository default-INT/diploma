package by.gstu.itp.palletprod.service;

import by.gstu.itp.palletprod.dto.AuthenticationDto;
import by.gstu.itp.palletprod.dto.UserDto;
import by.gstu.itp.palletprod.exception.NotFoundException;
import by.gstu.itp.palletprod.model.user.Role;
import by.gstu.itp.palletprod.model.user.User;
import by.gstu.itp.palletprod.repository.EmployeeRepository;
import by.gstu.itp.palletprod.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
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

    public UserDto getProfile(final Authentication authentication) {
        final User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(NotFoundException::new);
        return UserDto.of(user);
    }
}
