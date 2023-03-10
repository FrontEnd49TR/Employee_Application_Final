import { Employee } from "../model/Employee";
import employeeConfig from "../config/employee-config.json";
import { getRandomNumber } from "../utils/random";
import {app} from '../config/firebase-config';
import {collection,  getFirestore, getDocs, setDoc, doc, deleteDoc} from 'firebase/firestore';
const EMPLOYEES = "employees";
export class CompanyFirebase {
    private employeesCol = collection(getFirestore(app), EMPLOYEES);
    async addEmployee(empl: Employee): Promise<void> {
        empl.id = getRandomNumber(employeeConfig.minId, employeeConfig.maxId);
        this.updateEmployee(empl);
    }
    async updateEmployee(empl: Employee): Promise<void> {
        await setDoc(doc(this.employeesCol, empl.id.toString()), empl);
        
    }
    
    async removeEmployee(id: number): Promise<void> {
        await deleteDoc(doc(this.employeesCol, id.toString()));
    }
    async getAllEmployees(): Promise<Employee[]> {
        const docsSnapshot = await getDocs(this.employeesCol);
        return docsSnapshot.docs.map(doc => doc.data() as Employee);
    }
}