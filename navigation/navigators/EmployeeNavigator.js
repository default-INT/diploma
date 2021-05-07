import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {EditEmployeeScreen, EmployeeDetailsScreen, EmployeesScreen} from "../../screens/employees";
import {employeesOptions} from "../../screens/employees/EmployeesScreen";
import {employeeDetailsOptions} from "../../screens/employees/EmployeeDetailsScreen";
import {editEmployeeOptions} from "../../screens/employees/EditEmployeeScreen";
import {defaultStackNavOptions} from "../styles";

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