import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
const Login = () => {
    const navigate = useNavigate();
    const loginAPI = async () => {
        const data = await login();
        if (data) {
            // perform your login logic here
        }

        // Comment below code once start working on login api
        localStorage.setItem('token', 'dummy token');
        navigate(0); // refresh the page
    };

    return (
        <button onClick={() => loginAPI()}>Login now</button>
    );
};

export default Login;