import React, { useState } from "react";
import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button } from '@mui/material';
import employeeConfig from '../../config/employee-config.json';
import { Employee } from "../../model/Employee";

type Props = {
    submitFn: (empl: Employee) => boolean,
    employeeUpdate?: Employee
}
const initialEmployee: Employee = {
    id: 0, birthDate: '', name: '',
    department: '', salary: 0
};
export const EmployeeForm: React.FC<Props> = ({ submitFn, employeeUpdate }) => {
    const { minBirthYear, minSalary, maxBirthYear, maxSalary, departments }
        = employeeConfig;
    const [employee, setEmployee] =
        useState<Employee>(employeeUpdate ? employeeUpdate : initialEmployee);
    function handlerName(event: any) {
        const name = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.name = name;
        setEmployee(emplCopy);
    }
    function handlerBirthdate(event: any) {
        const birthDate = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.birthDate = birthDate;
        setEmployee(emplCopy);
    }
    function handlerSalary(event: any) {
        const salary: number = +event.target.value;
        const emplCopy = { ...employee };
        emplCopy.salary = salary;
        setEmployee(emplCopy);
    }
    function handlerDepartment(event: any) {
        const department = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.department = department;
        setEmployee(emplCopy);
    }
    function onSubmitFn(event: any) {
        event.preventDefault();
        submitFn(employee);
        document.querySelector('form')!.reset();
    }
    function onResetFn(event: any) {
        setEmployee(employeeUpdate ? employeeUpdate : initialEmployee);
    }

    return <Box sx={{ marginTop: { sm: "25vh" } }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={8} sm={5} >
                    <FormControl fullWidth required>
                        <InputLabel id="select-department-id">Department</InputLabel>
                        <Select labelId="select-department-id" label="Department"
                            value={employee.department} onChange={handlerDepartment}>
                            <MenuItem value=''>None</MenuItem>
                            {departments.map(dep => <MenuItem value={dep}>{dep}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Employee name"
                        helperText="enter Employee name" onChange={handlerName}
                        value={employee.name} inputProps={{
                            readOnly: !!employeeUpdate

                        }} />
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="date" required fullWidth label="birthDate"
                        value={employee.birthDate} inputProps={{
                            readOnly: !!employeeUpdate,
                            min: `${minBirthYear}-01-01`,
                            max: `${maxBirthYear}-12-31`
                        }} InputLabelProps={{
                            shrink: true
                        }} onChange={handlerBirthdate} />
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField label="salary" fullWidth required
                        type="number" onChange={handlerSalary}
                        value={employee.salary || ''}
                        helperText={`enter salary in range [${minSalary}-${maxSalary}]`}
                        inputProps={{
                            min: `${minSalary}`,
                            max: `${maxSalary}`
                        }} InputLabelProps={{
                            shrink: !!employeeUpdate || !!employee.salary
                        }} />
                </Grid>
            </Grid>




            <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                <Button type="submit">Submit</Button>
                <Button type="reset">Reset</Button>
            </Box>



        </form>
    </Box>
}