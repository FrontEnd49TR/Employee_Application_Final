import React from "react";
import {Box, TextField, Button, Alert} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import generationConfig from '../../config/generation-config.json';
import { employeesActions } from "../../redux/employees-slice";
import { createRandomEmployee } from "../../service/EmployeesService";
import { Employee } from "../../model/Employee";
import { codeActions } from "../../redux/codeSlice";
import { CodeType } from "../../model/CodeType";
export const Generation: React.FC = () => {
    const dispatch = useDispatch();
    const {defaultAmount, minAmount, maxAmount, alertTimeout} = generationConfig;
    const [amount, setAmount] = React.useState<number>(defaultAmount);
    const [flAlertSuccess, setAlertAccess] = React.useState<boolean>(false);
    const code: CodeType = useSelector<any, CodeType>(state=>state.errorCode.code );
    function handlerAmount(event: any): void {
        setAmount(+event.target.value);
    }
    function onSubmitFn(event: any) {
        event.preventDefault();
        const employeesAr: Employee[] = [];
        for (let i = 0; i < amount; i++) {
            employeesAr.push(createRandomEmployee());
        }
         
         dispatch(employeesActions.addBulkEmployees(employeesAr));
       alertAccess();
    }
    function alertAccess() {
        setTimeout(() => {if (code === "OK") setAlertAccess(true)}, 200)
        setTimeout(() => setAlertAccess(false), 5000);
    }


    return <Box>
        <form onSubmit={onSubmitFn} >
            <TextField label="amount of employee generated" fullWidth required 
            type="number" onChange={handlerAmount}
             value={amount}
              helperText={`enter amount of employee objects in range [${minAmount}-${maxAmount}]`}
              inputProps = {{
                min: `${minAmount}`,
                max: `${maxAmount}`
              }} />
              <Button type="submit">Generate</Button>

        </form>
        {flAlertSuccess && code === "OK" && <Alert severity="success">Generated 
        {amount} random employee objects</Alert>}
        {code !== "OK" && <Alert severity='error'
             onClose={() => {
                dispatch(codeActions.setCode("OK"));
                setAlertAccess(false);
                }}>{code}</Alert>}
               
    </Box>
}