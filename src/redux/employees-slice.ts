import {createSlice} from '@reduxjs/toolkit';
import { Employee } from '../model/Employee';
import { Company } from '../service/Company';
import { CompanyFirebase } from '../service/CompanyFirebase';
const company = new CompanyFirebase();
const initialState: {employees: Employee[]} = {
    employees: []
}
const employeesSlice = createSlice({
    initialState,
    name: "company",
    reducers: {
       setEmployees: (state, data) => {
        state.employees = data.payload;
       }
    }
})

export const employeesReducer = employeesSlice.reducer;
const actions = employeesSlice.actions;
export const employeesActions: any = {
    addEmployee : (empl: Employee)=> {
        return async (dispatch: any) => {
            await company.addEmployee(empl);
            const employees = await company.getAllEmployees();
            dispatch(actions.setEmployees(employees));

        }
    },
    updateEmployee : (empl: Employee)=> {
        return async (dispatch: any) => {
            await company.updateEmployee(empl);
            const employees = await company.getAllEmployees();
            dispatch(actions.setEmployees(employees));

        }
    },
    removeEmployee : (id: number)=> {
        return async (dispatch: any) => {
            await company.removeEmployee(id);
            const employees = await company.getAllEmployees();
            dispatch(actions.setEmployees(employees));

        }
    },
    getEmployees: ()=> {
        return async (dispatch: any) => {
            const employees = await company.getAllEmployees();
            dispatch(actions.setEmployees(employees));
        }
    },
    addBulkEmployees: (employeesAr: Employee[]) => {
        return async (dispatch: any) => {
            employeesAr.forEach(async (empl) => await company.addEmployee(empl));
            const employees = await company.getAllEmployees();
            dispatch(actions.setEmployees(employees));
        }
    }


}