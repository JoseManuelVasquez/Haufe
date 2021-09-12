import React, {useEffect, useRef, useState} from 'react'
import styles from '../styles/Login.module.css'
import {Link, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {register, setUserLogged, setUsername} from "../slices/userSlice";
import {unwrapResult} from "@reduxjs/toolkit";

const Signup = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const dispatch = useDispatch();
    const mountedRef = useRef(true);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!mountedRef.current) return null;
            const resultAction = await dispatch(register({username, password}));
            const originalPromiseResult = unwrapResult(resultAction);
            if (originalPromiseResult.success) {
                dispatch(setUsername(username));
                dispatch(setUserLogged(true));
                setRegistered(true);
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

    if (registered) {
        return <Redirect to="/login"/>;
    }

    return (
        <div className={styles.box}>
            <form onSubmit={handleSubmit}>
                <h1 className={styles.title}>Register</h1>
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
                    <button className={styles.userSubmit} type="submit">Sign Up</button>
                </div>
                <div className={styles.formFooter}>
                    Already a user? <Link to="/login">Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
