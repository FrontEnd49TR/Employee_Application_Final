import { authActions } from "../../redux/authSlice";
import { useDispatch } from 'react-redux'
import { Input } from "../Input";
import React from "react";
import { AuthService } from '../../service/AuthService';
import { LoginForm } from "../forms/LoginForm";
import { LoginData } from "../../model/LoginData";
import { Box } from "@mui/material";

const authService = new AuthService();
export const Login: React.FC = () => {
    const dispatch = useDispatch();


    function loginSubmit(loginData: LoginData): string {
        let message: string = '';
        try {
            authService.login(loginData);
            dispatch(authActions.login(loginData.username));
        } catch (e: any) {
            message = e
        }
        return message;
    }


    return <Box>

        <LoginForm submitFn={loginSubmit} />
    </Box>
}

