'use client'
import { useContext, useState } from 'react';
import styles from '@/styles/authStyles/SignUp.module.css';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';

function SignUp() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            await register(name, email, password);
            router.push('/auth/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h1 className={styles.signupTitle}>Sign Up</h1>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <div className={styles.signupInputContainer}>
                    <label className={styles.signupLabel} htmlFor="name">Name</label>
                    <input
                        className={styles.signupInput}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.signupInputContainer}>
                    <label className={styles.signupLabel} htmlFor="email">Email</label>
                    <input
                        className={styles.signupInput}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.signupInputContainer}>
                    <label className={styles.signupLabel} htmlFor="password">Password</label>
                    <input
                        className={styles.signupInput}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.signupInputContainer}>
                    <label className={styles.signupLabel} htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className={styles.signupInput}
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.signupButton} type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
