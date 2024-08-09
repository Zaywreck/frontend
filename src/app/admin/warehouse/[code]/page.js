'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';
import styles from '@/styles/componentStyles/EditPage.module.css';

export default function EditWarehousePage({ params }) {
    const code = params.code;
    const router = useRouter();
    const { fetchWarehouse, updateWarehouse, loading } = useContext(AppContext);
    const [warehouse, setWarehouse] = useState(null);

    useEffect(() => {
        if (code) {
            const fetchData = async () => {
                const data = await fetchWarehouse(code);
                setWarehouse(data);
            };
            fetchData();
        }
    }, [code, fetchWarehouse]);

    const handleSave = async () => {
        if (loading || !warehouse) return;
        try {
            await updateWarehouse(warehouse.warehouse_code, warehouse);
            router.push('/admin/warehouse');
        } catch (error) {
            console.error('Error updating warehouse:', error);
        }
    };

    const handleChange = (e) => {
        if (warehouse) {
            setWarehouse({ ...warehouse, [e.target.name]: e.target.value });
        }
    };

    // Render loading or error state if warehouse data is not loaded
    if (loading || warehouse === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Warehouse {code}</h1>
            <input
                type="text"
                name="warehouse_name"
                value={warehouse.warehouse_name || ''}
                onChange={handleChange}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                name="city_code"
                value={warehouse.city_code || ''}
                onChange={handleChange}
                disabled={loading}
                className={styles.input}
            />
            <button onClick={handleSave} disabled={loading} className={styles.button}>Save</button>
            <button onClick={() => router.back()} disabled={loading} className={styles.button}>Cancel</button>
        </div>
    );
}
