package by.gstu.itp.palletprod.dto;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class EmployeeDto {

    private String id;
    @NotBlank
    @Size(min = 2, max = 30)
    private String firstName;
    @NotBlank
    @Size(min = 2, max = 30)
    private String secondName;
    @NotBlank
    @Size(min = 2, max = 30)
    private String lastName;
    @Digits(integer=3, fraction=0)
    private int age;
}
