package by.gstu.itp.palletprod.repository;

import by.gstu.itp.palletprod.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String>, PagingAndSortingRepository<Employee, String> {
    List<Employee> findAllByFiredFalseAndLastNameStartingWith(String lastName);
    Page<Employee> findAllByFiredAndLastNameStartingWith(boolean fired, String lastName, Pageable pageRequest);
}
