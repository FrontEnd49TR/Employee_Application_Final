import React from 'react';
import { useSelector } from 'react-redux';
import { Employee } from '../../model/Employee';
import { Statistics } from '../Statistics';
export const AgeStatistics: React.FC = () => {
    const employees: Employee[] = useSelector<any, Employee[]>(state => state.company.employees)
    const employeesAge = employees.map(empl => ({
        age: new Date().getFullYear() - new Date(empl.birthDate).getFullYear()
    }))
    return <Statistics title="Age Statistics" field="age" objects={employeesAge} />
}