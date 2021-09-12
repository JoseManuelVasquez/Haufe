import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from "react-redux";

const LoginRequired = (props) => {
    const { isLogged }  = useSelector((state) => state.user);

    return (
        isLogged ? <Route {...props}/> : <Redirect to="/login" />
    )
};

export default LoginRequired