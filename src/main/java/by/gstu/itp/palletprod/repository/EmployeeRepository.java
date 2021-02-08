package by.gstu.itp.palletprod.repository;

import by.gstu.itp.palletprod.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    List<Employee> findAllByLastNameStartingWith(String lastName);
}
