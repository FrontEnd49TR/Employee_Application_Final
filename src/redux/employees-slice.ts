import { createSlice } from '@reduxjs/toolkit';
import { Employee } from '../model/Employee';
import { CompanyFirebase } from '../service/CompanyFirebase';
import { codeActions } from './codeSlice';
const company = new CompanyFirebase();
const initialState: { employees: Employee[] } = {
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
    addEmployee: (empl: Employee) => {
        return async (dispatch: any) => {
            try {
                await company.addEmployee(empl);
                dispatch(employeesActions.getEmployees());
                dispatch(codeActions.setCode("OK"));
            } catch (error: any) {
                dispatch(codeActions.setCode("Authorization error"));
            }

        }
    },
    updateEmployee: (empl: Employee) => {
        return async (dispatch: any) => {
            try {
                await company.updateEmployee(empl);
                dispatch(employeesActions.getEmployees());
                dispatch(codeActions.setCode("OK"));
            } catch (error: any) {
                dispatch(codeActions.setCode("Authorization error"));
            }

        }
    },
    removeEmployee: (id: number) => {
        return async (dispatch: any) => {
            try {
                await company.removeEmployee(id);
                dispatch(employeesActions.getEmployees());
                dispatch(codeActions.setCode("OK"));
            } catch (error: any) {
                dispatch(codeActions.setCode("Authorization error"));
            }


        }
    },
    getEmployees: () => {
        return async (dispatch: any) => {
            try {
                const employees = await company.getAllEmployees();
                dispatch(actions.setEmployees(employees));
                dispatch(codeActions.setCode("OK"));
            } catch (error: any) {
                dispatch(codeActions.setCode("Unknown Error"));
            }

        }
    },
    addBulkEmployees: (employeesAr: Employee[]) => {
        return async (dispatch: any) => {
            for(let i = 0; i < employeesAr.length; i++) {
                try{
                    await company.addEmployee(employeesAr[i]);
                    dispatch(codeActions.setCode("OK"));
                }catch(error: any) {
                    dispatch(codeActions.setCode("Authorization error"));
                    return;
                } 
            }
               
            
           
            const employees = await company.getAllEmployees();
            dispatch(actions.setEmployees(employees));
        }
    }


}