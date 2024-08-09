'use client';
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';
import Table from '../utils/Table';
import styles from '@/styles/componentStyles/WarehouseManagement.module.css';
import WarehouseAdd from './utils/WarehouseAdd';

const WarehouseManagement = () => {
    const router = useRouter();
    const { fetchWarehouseData, addWarehouse, deleteWarehouse, warehouses, loading } = useContext(AppContext);
    const [newWarehouse, setNewWarehouse] = useState({ warehouse_code: '', warehouse_name: '', city_code: '' });

    useEffect(() => {
        fetchWarehouseData();
    }, [fetchWarehouseData]);

    const handleAddWarehouse = async () => {
        if (loading) return;
        if (!newWarehouse.warehouse_code || !newWarehouse.warehouse_name || !newWarehouse.city_code) {
            alert('Please fill out all fields');
            return;
        }
        try {
            await addWarehouse(newWarehouse);
            await fetchWarehouseData();
            setNewWarehouse({ warehouse_code: '', warehouse_name: '', city_code: '' });
        } catch (error) {
            console.error('Error adding warehouse:', error);
        }
    };

    const handleDeleteWarehouse = async (code) => {
        if (loading) return;
        const confirmDelete = window.confirm('Are you sure you want to delete this warehouse?');
        if (confirmDelete) {
            try {
                await deleteWarehouse(code);
                await fetchWarehouseData();
            } catch (error) {
                console.error('Error deleting warehouse:', error);
            }
        }
    };

    const columns = ['warehouse_code', 'warehouse_name', 'city_code'];

    const actions = [
        {
            label: 'Edit',
            handler: (row) => {
                router.push(`/admin/warehouse/${row.warehouse_code}`);
            }
        },
        {
            label: 'Delete',
            handler: (row) => handleDeleteWarehouse(row.warehouse_code)
        }
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Warehouse Management</h2>
            {loading && <p className={styles.loading}>Loading...</p>}
            <WarehouseAdd newWarehouse={newWarehouse} setNewWarehouse={setNewWarehouse} handleAddWarehouse={handleAddWarehouse} loading={loading} />
            <Table columns={columns} data={warehouses} actions={actions} />
        </div>
    );
};

export default WarehouseManagement;
