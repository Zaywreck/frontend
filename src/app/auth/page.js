'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import styles from '@/styles/authStyles/auth.module.css';
import SignUp from './signup/page';
import Login from './login/page';

function Page() {
    const { user, loading } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            setIsLoggedIn(!!user);
        }
    }, [loading, user]);

    if (loading) return <div>Loading...</div>;  // Show a loading spinner or message while checking auth status

    return (
        <div className={styles.authPage}>
            {isLoggedIn ? (
                <div>
                    <p>You are already logged in. Please sign out if you want to use another account.</p>
                    <button onClick={() => {
                        // Implement sign out logic, e.g., clear localStorage and update AuthContext
                        localStorage.removeItem('access_token');
                        router.push('/auth');  // Redirect to login page or homepage after sign out
                    }}>Sign Out</button>
                </div>
            ) : (
                <div>
                    <p>You are not logged in. Please sign in to use this feature.</p>
                    <SignUp />
                    <Login />
                </div>
            )}
        </div>
    );
}

export default Page;
