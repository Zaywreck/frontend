import { constants } from '@/context/constants';
import axios from 'axios';

const url = constants.url;
export const fetchInventoryLine = async (inventory_code) => {
    try {
        const response = await axios.get(`${url}/inventory/${inventory_code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory line:', error);
        throw error;
    }
};

export const addToInventory = async (item) => {
    try {
        const response = await axios.post(`${url}/inventory/`, item);
        return response.data;
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        throw error;
    }
};

export const deleteFromInventory = async (id) => {
    try {
        await axios.delete(`${url}/inventory/${id}`);
    } catch (error) {
        console.error('Error deleting item from inventory:', error);
        throw error;
    }
};

export const updateInInventory = async (id, item) => {
    try {
        const response = await axios.put(`${url}/inventory/${id}`, item);
        return response.data;
    } catch (error) {
        console.error('Error updating item in inventory:', error);
        throw error;
    }
};

// Upload a file to the server
export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${url}/inventory/upload/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};