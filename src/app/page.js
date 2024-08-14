'use client';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import WarehouseOverview from '@/components/warehouseViewComps/WarehouseOverview';
import Login from './auth/login/page';
import styles from './page.module.css';

export default function Page() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (!user) {
        // User is not logged in
        return (
            <div>
                <Login />
            </div>
        );
    }

    // User is logged in
    return (
        <main className={styles.main}>
            <WarehouseOverview />
        </main>
    );
}
