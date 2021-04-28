import React from "react";
import {Picker} from "@react-native-picker/picker";


const EmployeePicker = ({selectedEmployeeId, setSelectedEmployeeId, employees}) => {
    return (
        <Picker
            selectedValue={selectedEmployeeId}
            onValueChange={((itemValue, itemIndex) => {
                setSelectedEmployeeId(itemValue);
            } )}
        >
            {employees.map(({fullName, id}) =>  <Picker.Item key={id} label={fullName} value={id} />)}
        </Picker>
    )
}

export default EmployeePicker;