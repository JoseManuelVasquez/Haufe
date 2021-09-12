import React, {useEffect, useRef, useState} from 'react'
import styles from '../styles/Login.module.css'
import { unwrapResult } from '@reduxjs/toolkit'
import {useDispatch, useSelector} from 'react-redux'
import {login, setUserLogged, setUsername} from '../slices/userSlice'
import {Link, Redirect} from "react-router-dom";

const Login = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const { isLogged } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const mountedRef = useRef(true);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!mountedRef.current) return null;
            const resultAction = await dispatch(login({username, password}));
            const originalPromiseResult = unwrapResult(resultAction);
            if (originalPromiseResult.success) {
                dispatch(setUsername(username));
                dispatch(setUserLogged(true));
            }
        } catch (rejectedValueOrSerializedError) {
            console.error(rejectedValueOrSerializedError);
        }
    };

    useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, []);

    if (isLogged) {
        return <Redirect to="/"/>;
    }

    return (
        <div className={styles.box}>
            <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>Log in</h1>
                <div className={styles.userLabel}>
                    <label>Username</label>
                </div>
                <div className={styles.userBox}>
                    <input className={styles.userInput}
                           value={username}
                           onChange={e => setUser(e.target.value)}
                           placeholder="username"
                           size="large"
                           type="text"
                    />
                </div>
                <div className={styles.userLabel}>
                    <label>Password</label>
                </div>
                <div className={styles.userBox}>
                    <input className={styles.userInput}
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           placeholder="••••••••"
                           size="large"
                           type="password"
                    />
                </div>
                <div className={styles.userSubmitBox}>
                    <button className={styles.userSubmit} type="submit">Log in</button>
                </div>
                <div className={styles.formFooter}>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
