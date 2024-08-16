import { constants } from '@/context/constants';
import axios from 'axios';

const url = constants.url;

export const fetchWarehouse = async (code) => {
    try {
        const response = await fetch(`${url}/warehouses/${code}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching warehouse:', error);
        throw error;
    }
};

export const addWarehouse = async (warehouse) => {
    try {
        const response = await axios.post(`${url}/warehouses/`, warehouse);
        return response.data;
    } catch (error) {
        console.error('Error adding warehouse:', error);
        throw error;
    }
};

export const updateWarehouse = async (code, warehouse) => {
    try {
        const response = await axios.put(`${url}/warehouses/update/${code}`, warehouse);
        return response.data;
    } catch (error) {
        console.error('Error updating warehouse:', error);
        throw error;
    }
};

export const deleteWarehouse = async (code) => {
    try {
        await axios.delete(`${url}/warehouses/${code}`);
    } catch (error) {
        console.error('Error deleting warehouse:', error);
        throw error;
    }
};
