import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

export const fetchWarehouse = async (code) => {
    try {
        const response = await fetch(`${API_URL}/warehouses/${code}`);
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
        const response = await axios.post(`${API_URL}/warehouses/`, warehouse);
        return response.data;
    } catch (error) {
        console.error('Error adding warehouse:', error);
        throw error;
    }
};

export const updateWarehouse = async (code, warehouse) => {
    try {
        const response = await axios.put(`${API_URL}/warehouses/update/${code}`, warehouse);
        return response.data;
    } catch (error) {
        console.error('Error updating warehouse:', error);
        throw error;
    }
};


export const deleteWarehouse = async (code) => {
    try {
        await axios.delete(`${API_URL}/warehouses/${code}`);
    } catch (error) {
        console.error('Error deleting warehouse:', error);
        throw error;
    }
};
