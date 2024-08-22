import React, { useContext, useState } from 'react';
import styles from '@/styles/authStyles/Login.module.css';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import { logAction } from '@/services/loggerService'; // Import the logging function

function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password).then((data) => {
                logAction(data.id, 'login', `User ${data.username} logged in`);
            });
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please check your email and password.');
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
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <button className={styles.loginButton} type="submit">Login</button>
            </form>
            <p>------</p>
            <p className={styles.loginText}>Don't have an account? <a href="/auth/signup">Sign up</a></p>
        </div>
    );
}

export default Login;
