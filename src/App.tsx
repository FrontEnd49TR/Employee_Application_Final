import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import { layoutConfig } from './config/layout-config';
import { Employees } from './components/pages/Employees';
import { AddEmployee } from './components/pages/AddEmployee';
import { AgeStatistics } from './components/pages/AgeStatistics';
import { SalaryStatistics } from './components/pages/SalaryStatistics';
import { useEffect, useState } from 'react';
import { RouteType } from './model/RouteType';
import { useSelector, useDispatch } from 'react-redux';
import { company, setEmployees } from './redux/employees-slice';
import { Login } from './components/pages/Login';
import { Logout } from './components/pages/Logout';
import { Generation } from './components/pages/Generation';
import { NavigatorDispatch } from './components/navigators/NavigatorDispatch';
import { Employee } from './model/Employee';
import { codeActions } from './redux/codeSlice';
import {Subscription} from 'rxjs';


function App() {
    const dispatch = useDispatch<any>();
    const [routes, setRoutes] = useState<RouteType[]>([]);
    const authUser:string = useSelector<any,string>(state=>state.auth.authenticated );
    useEffect(()=> {
        function getRoutes(): RouteType[] {
            const logoutRoute: RouteType |undefined = layoutConfig.routes
            .find(r => r.path.includes('logout'))
            logoutRoute!.label = authUser;
            return layoutConfig.routes.filter(r => (!authUser && !r.flAuth) ||
            (authUser.includes('admin') && r.flAdmin) ||
            (authUser && r.flAuth && !r.flAdmin))
        }
        setRoutes(getRoutes());
    }, [authUser]);
    useEffect(() => {
        let subscription: Subscription;
        if(authUser) {
             subscription = company.getAllEmployees().subscribe({
                next: (employees: Employee[]) => {
                    dispatch(setEmployees(employees));
                    dispatch(codeActions.setCode("OK"));
                },
                error: (err: any) => {
                    dispatch(codeActions.setCode("Unknown Error"))
                }
             })
        }
        return () => {
            subscription && subscription.unsubscribe();
            console.log("unsubscribing");
        };
      
    },[authUser])
  return <BrowserRouter>
      <Routes>
          <Route path='/' element={<NavigatorDispatch 
           routes={routes}  />}>
              <Route index element={<Employees/>}/>
              <Route path='add' element={<AddEmployee/>}/>
              <Route path='statistics/age' element={<AgeStatistics/>}/>
              <Route path='statistics/salary' element={<SalaryStatistics/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='logout' element={<Logout/>}/>
              <Route path='generation' element={<Generation/>}/>
              
          </Route>
              
      </Routes>
  </BrowserRouter>

}
export default App;