import { NavigatorProps } from "../model/NavigatorProps";
export const layoutConfig: NavigatorProps = {
    routes: [
        { label: 'Employees', path: '/', flAuth: true },
        { label: 'Add Employees', path: '/add', flAuth: true, flAdmin: true},
       
        { label: 'Age Statistics', path: '/statistics/age' ,
         flAuth: true, flAdmin: false},
        { label: 'Salary Statistics', path: '/statistics/salary',
         flAuth: true, flAdmin: false },
         {label: 'Logout', path: '/logout', flAuth: true},
         {label: 'Login', path: '/login', flAuth: false}

    ]

}
const developmentRoutes = [
    { label: 'Generation', path: '/generation', flAuth: true, flAdmin: true},
];
if (process.env.NODE_ENV == 'development') {
    layoutConfig.routes.push(...developmentRoutes);
}