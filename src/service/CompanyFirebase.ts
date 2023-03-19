import { Employee } from "../model/Employee";
import employeeConfig from "../config/employee-config.json";
import { getRandomNumber } from "../utils/random";
import {collectionData} from 'rxfire/firestore';
import {app} from '../config/firebase-config';
import {collection,  getFirestore, getDocs, setDoc, doc, deleteDoc} from 'firebase/firestore';
import { Observable } from "rxjs";
const EMPLOYEES = "employees";
export class CompanyFirebase {
    private employeesCol = collection(getFirestore(app), EMPLOYEES);
    async addEmployee(empl: Employee): Promise<void> {
        empl.id = getRandomNumber(employeeConfig.minId, employeeConfig.maxId);
        await this.updateEmployee(empl);
    }
    async updateEmployee(empl: Employee): Promise<void> {
        await setDoc(doc(this.employeesCol, empl.id.toString()), empl);
        
    }
    
    async removeEmployee(id: number): Promise<void> {
        await deleteDoc(doc(this.employeesCol, id.toString()));
    }
     getAllEmployees(): Observable<Employee[]> {
        return collectionData(this.employeesCol) as Observable<Employee[]>
    }
}