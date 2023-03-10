import React from 'react';

import { useSelector } from 'react-redux';
import { Employee } from '../../model/Employee';
import { Statistics } from '../Statistics';
export const SalaryStatistics: React.FC = () => {
    const employees = useSelector<any, Employee[]>
        (state => state.company.employees);
    return <Statistics title="Salary Statistics" field="salary" objects={employees} />
}