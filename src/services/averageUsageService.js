import axios from "axios";
import { logAction } from "./loggerService";

const { constants } = require("@/context/constants");

const url = constants.url;

export const fetchAverageUsage = async (id, userId) => {
    try {
        const response = await axios.get(`${url}/average/${id}/`);
        await logAction(userId, 'fetch_average_usage', `Fetched average usage data for ${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching average usage:', error);
    }
}

export const updateAverageUsage = async (averageUsage, userID) => {
    try {
        await axios.put(`${url}/average/update/${averageUsage.id}/`, averageUsage);
        await logAction(userID, 'update_average_usage', `Updated average usage for ${averageUsage.id}`);
    } catch (error) {
        console.error('Error updating average usage:', error);
    }
}

export const deleteAverageUsage = async (product_code, userId) => {
    try {
        await axios.delete(`${url}/average/delete/${product_code}/`);
        await logAction(userId, 'delete_average_usage', `Deleted average usage for ${product_code}`);
    } catch (error) {
        console.error('Error deleting average usage:', error);
    }
}

export const addAverageUsage = async (averageUsage, userId) => {
    try {
        await axios.post(`${url}/average/create/`, averageUsage);
        await logAction(userId, 'add_average_usage', `Added average usage for ${averageUsage.product_code}`);
    } catch (error) {
        console.error('Error adding average usage:', error);
    }
}

