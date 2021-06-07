import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {EditEmployeeScreen, EmployeeDetailsScreen, EmployeesScreen} from "../../../screens/admin/employees";
import {employeesOptions} from "../../../screens/admin/employees/EmployeesScreen";
import {employeeDetailsOptions} from "../../../screens/admin/employees/EmployeeDetailsScreen";
import {editEmployeeOptions} from "../../../screens/admin/employees/EditEmployeeScreen";
import {defaultStackNavOptions} from "../../styles";

const EmployeesStackNavigator = createStackNavigator()

export const EmployeeNavigator = () => {
    return (
        <EmployeesStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
            <EmployeesStackNavigator.Screen
                name="Employees"
                component={EmployeesScreen}
                options={employeesOptions}
            />
            <EmployeesStackNavigator.Screen
                name="EmployeeDetails"
                component={EmployeeDetailsScreen}
                options={employeeDetailsOptions}
            />
            <EmployeesStackNavigator.Screen
                name="EditEmployee"
                component={EditEmployeeScreen}
                options={editEmployeeOptions}
            />
        </EmployeesStackNavigator.Navigator>
    )
}