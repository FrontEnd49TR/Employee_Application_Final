import React, { ReactNode, useRef, useState } from 'react';
import { Box, IconButton,Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Employee } from '../../model/Employee';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Delete, Edit, PersonAdd } from '@mui/icons-material';
import './table.css'
import { employeesActions } from '../../redux/employees-slice';
import { EmployeeForm } from '../forms/EmployeeForm';
import { Confirmation } from '../common/Confirmation';
import { CodeType } from '../../model/CodeType';
import { codeActions } from '../../redux/codeSlice';
export const Employees: React.FC = () => {
    const dispatch = useDispatch();
    const authUser = useSelector<any, string>(state => state.auth.authenticated);
    const editId = useRef<number>(0);
    const columns = React.useRef<GridColDef[]>([
        {
            field: 'name', headerClassName: 'header', headerName: 'Employee Name',
            flex: 1, headerAlign: 'center', align: 'center'
        },
        {
            field: 'birthDate', headerName: 'Date of Birth', flex: 1, headerClassName: 'header',
            type: "string", headerAlign: 'center', align: 'center'
        },
        {
            field: 'department', headerName: 'Department', headerClassName: 'header',
            flex: 1, headerAlign: 'center', align: 'center'
        },
        {
            field: 'salary', headerName: "Salary (NIS)", headerClassName: 'header',
            flex: 0.7, type: "number", headerAlign: 'center', align: 'center'
        },
        {
            field: 'actions', type: "actions", getActions: (params) => {
                return authUser.includes('admin') ? [
                    <GridActionsCellItem label="remove" icon={<Delete />}
                        onClick={() => removeEmployee(+params.id)
                            } />,
                    <GridActionsCellItem label="update" icon={<Edit />}
                        onClick={() => {
                            editId.current = +params.id;
                            setFlEdit(true)
                        }
                        } />
                ] : [];
            }
        }

    ])
    const [flEdit, setFlEdit] = useState<boolean>(false);
    const [flAdd, setFlAdd] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const title = useRef<string>("");
    const content = useRef<string>("");
    const confirmFn = useRef<(isOk: boolean)=>void>((isOK)=> {});
    const employees = useSelector<any, Employee[]>(state => state.company.employees);
    const idRemoved = useRef<number>(0);
    const code: CodeType = useSelector<any, CodeType>(state=>state.errorCode.code );
    const employeeToUpdate = useRef<Employee>();
    function removeEmployee(id: number) {
        title.current = "Remove Employee object?";
        const employee = employees.find(empl => empl.id == id);
        content.current = `You are going remove employee with id ${employee?.name}`;
        idRemoved.current = id;
        confirmFn.current = actualRemove;
        setOpen(true);
    }
    function actualRemove(isOk: boolean) {
        if (isOk) {
            dispatch(employeesActions.removeEmployee(idRemoved.current))
        }
        setOpen(false);
    }
    function actualUpdate(isOk: boolean) {
        if(isOk) {
            dispatch(employeesActions.updateEmployee(employeeToUpdate.current));
        }
        setOpen(false);
    }
    function getComponent(): ReactNode {
        let res: ReactNode = <Box sx={{ height: "70vh", width: "80vw" }}>
                <DataGrid columns={columns.current} rows={employees}/>
                {authUser.includes("admin") && <IconButton onClick={() => setFlAdd(true)}><PersonAdd/></IconButton>}
        </Box>
        if (code == "Authorization error") {
            res = <Alert severity='error'
             onClose={() => dispatch(codeActions.setCode("OK"))}>Authorization Error, contact admin</Alert>
        } else if (flEdit) {
            res = <EmployeeForm submitFn={function (empl: Employee): boolean {
                
                title.current = "Update Employee object?";
                content.current = `You are going update Employee ${empl.name}`;
                employeeToUpdate.current = empl;
                confirmFn.current = actualUpdate;
                setOpen(true);
                setFlEdit(false);
                return true;
            } } employeeUpdate = {employees.find(empl => empl.id == editId.current)} />
        } else if (flAdd) {
            res = <EmployeeForm submitFn={function (empl: Employee): boolean {
                dispatch(employeesActions.addEmployee(empl));
                setFlAdd(false);
                return true;
            } }/>
        }else if (code == "Unknown Error") {
            res = <Alert severity='error'
             onClose={() => dispatch(codeActions.setCode("OK"))}>Unknown Error</Alert>
        }
        return res;
    }
    return <Box sx={{ height: "80vh", width: "80vw" }}>
        {getComponent()}
        <Confirmation confirmFn={confirmFn.current} open={open}
         title={title.current} content={content.current}></Confirmation>
         
    </Box>
}