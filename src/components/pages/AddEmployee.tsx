import React from 'react';
import { Box, Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { employeesActions } from '../../redux/employees-slice';
import { createRandomEmployee } from '../../service/EmployeesService';
import { EmployeeForm } from '../forms/EmployeeForm';
export const AddEmployee: React.FC = () => {
    const dispatch = useDispatch<any>();
    return <EmployeeForm submitFn={(employee) => {
        dispatch(employeesActions.addEmployee(employee));
        return true;
    }} />
}
