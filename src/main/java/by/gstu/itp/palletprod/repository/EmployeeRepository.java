package by.gstu.itp.palletprod.repository;

import by.gstu.itp.palletprod.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
}
