import { createSlice } from '@reduxjs/toolkit';
import { Employee } from '../model/Employee';
import { CompanyFirebase } from '../service/CompanyFirebase';
import { codeActions } from './codeSlice';
export const company = new CompanyFirebase();
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
export const {setEmployees} = employeesSlice.actions;
export const employeesActions: any = {
    addEmployee: (empl: Employee) => {
        return async (dispatch: any) => {
            try {
                await company.addEmployee(empl);
             
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
                
                dispatch(codeActions.setCode("OK"));
            } catch (error: any) {
                dispatch(codeActions.setCode("Authorization error"));
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
            
               
            
           
            
           
        }
    }


}