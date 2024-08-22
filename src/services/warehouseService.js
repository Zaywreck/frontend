import { constants } from '@/context/constants';
import axios from 'axios';
import { logAction } from './loggerService';

const url = constants.url;

export const fetchWarehouse = async (code, userId) => {
    try {
        const response = await fetch(`${url}/warehouses/${code}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        await logAction(userId, 'fetch_warehouse', `Fetched warehouse data for ${code}`);
        return data;
    } catch (error) {
        console.error('Error fetching warehouse:', error);
        throw error;
    }
};

export const addWarehouse = async (warehouse, userId) => {
    try {
        const response = await axios.post(`${url}/warehouses/`, warehouse);
        await logAction(userId, 'add_warehouse', `Added warehouse: ${warehouse.code}`);
        return response.data;
    } catch (error) {
        console.error('Error adding warehouse:', error);
        throw error;
    }
};

export const updateWarehouse = async (code, warehouse, userId) => {
    try {
        const response = await axios.put(`${url}/warehouses/update/${code}`, warehouse);
        await logAction(userId, 'update_warehouse', `Updated warehouse: ${code}`);
        return response.data;
    } catch (error) {
        console.error('Error updating warehouse:', error);
        throw error;
    }
};

export const deleteWarehouse = async (code, userId) => {
    try {
        await axios.delete(`${url}/warehouses/${code}`);
        await logAction(userId, 'delete_warehouse', `Deleted warehouse: ${code}`);
    } catch (error) {
        console.error('Error deleting warehouse:', error);
        throw error;
    }
};
