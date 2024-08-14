'use client'
import React, { useContext, useState } from 'react';
import styles from '@/styles/authStyles/Login.module.css';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';

function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.loginInputContainer}>
                    <label className={styles.loginLabel} htmlFor="email">Email</label>
                    <input
                        className={styles.loginInput}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.loginInputContainer}>
                    <label className={styles.loginLabel} htmlFor="password">Password</label>
                    <input
                        className={styles.loginInput}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.loginButton} type="submit">Login</button>
            </form>
            <p>------</p>
            <p className={styles.loginText}>Don't have an account? <a href="/auth/signup">Sign up</a></p>
        </div>
    );
}

export default Login;
