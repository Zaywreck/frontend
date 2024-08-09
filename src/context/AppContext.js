'use client'
import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { fetchWarehouse, addWarehouse, updateWarehouse, deleteWarehouse } from '@/services/warehouseService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseData, setWarehouseData] = useState({});
    const [loading, setLoading] = useState(true);
    const url = 'http://127.0.0.1:8000';

    const fetchWarehouseData = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/warehouses/`);
            setWarehouses(response.data);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const fetchSingleWarehouseData = useCallback(async (warehouseCode) => {
        try {
            const response = await axios.get(`${url}/inventory/${warehouseCode}`);
            setWarehouseData(prev => ({ ...prev, [warehouseCode]: response.data }));
        } catch (error) {
            console.error('Error fetching warehouse data:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const values = {
        fetchWarehouse,
        addWarehouse,
        updateWarehouse,
        deleteWarehouse,
        warehouses,
        warehouseData,
        fetchWarehouseData,
        fetchSingleWarehouseData,
        loading
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
