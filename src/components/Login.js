import React from 'react';
import { login } from '../api';
const Login = () => {
    const loginAPI = async () => {
        const data = await login();
        if (data) {
            // set token in local storage
        }
    };

    return (
        <button onClick={() => loginAPI()}>Login now</button>
    );
};

export default Login;