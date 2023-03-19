import { authActions } from "../../redux/authSlice";
import {useDispatch, useSelector} from 'react-redux'
import { Input } from "../Input";
import React from "react";
import {AuthService} from '../../service/AuthService';
import { LoginForm } from "../forms/LoginForm";
import { LoginData } from "../../model/LoginData";
import { Box } from "@mui/material";
import { CodeType } from "../../model/CodeType";

export const Login: React.FC = ()=>{
   
    const dispatch = useDispatch<any>();
    const code: CodeType = useSelector<any, CodeType>(state=>state.errorCode.code )
    function loginSubmit(loginData: LoginData): void {
       
            dispatch(authActions.login(loginData));
        
       
    }
    return <Box>
        
        <LoginForm submitFn={loginSubmit} code={code}/>
        </Box>
}