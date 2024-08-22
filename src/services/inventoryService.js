import { constants } from '@/context/constants';
import axios from 'axios';
import { logAction } from './loggerService';

const url = constants.url;
export const fetchInventoryLine = async (inventory_code, userId) => {
    try {
        const response = await axios.get(`${url}/inventory/${inventory_code}`);
        await logAction(userId, 'fetch_inventory_line', `Fetched inventory line data for ${inventory_code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory line:', error);
        throw error;
    }
};

export const addToInventory = async (item, userId) => {
    try {
        const response = await axios.post(`${url}/inventory/`, item);
        await logAction(userId, 'add_to_inventory', `Added item to inventory: ${item.inventory_code}`);
        return response.data;
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        throw error;
    }
};

export const deleteFromInventory = async (id, userId) => {
    try {
        await axios.delete(`${url}/inventory/${id}`);
        await logAction(userId, 'delete_from_inventory', `Deleted item from inventory: ${id}`);
    } catch (error) {
        console.error('Error deleting item from inventory:', error);
        throw error;
    }
};

export const updateInInventory = async (id, item, userId) => {
    try {
        const response = await axios.put(`${url}/inventory/update/${id}`, item);
        await logAction(userId, 'update_in_inventory', `Updated item in inventory: ${id}`);
        return response.data;
    } catch (error) {
        console.error('Error updating item in inventory:', error);
        throw error;
    }
};

// Upload a file to the server
export const uploadFile = async (file, userId) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${url}/inventory/upload/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        await logAction(userId, 'upload_file', `Uploaded file: ${user.id}`);
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};