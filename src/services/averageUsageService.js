import axios from "axios";

const { constants } = require("@/context/constants");

const url = constants.url;

export const fetchAverageUsage = async (id) => {
    try {
        const response = await axios.get(`${url}/average/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching average usage:', error);
    }
}

export const updateAverageUsage = async (averageUsage) => {
    try {
        await axios.put(`${url}/average/update/${averageUsage.id}/`, averageUsage);
    } catch (error) {
        console.error('Error updating average usage:', error);
    }
}

export const deleteAverageUsage = async (product_code) => {
    try {
        await axios.delete(`${url}/average/delete/${product_code}/`);
    } catch (error) {
        console.error('Error deleting average usage:', error);
    }
}

export const addAverageUsage = async (averageUsage) => {
    try {
        await axios.post(`${url}/average/add/`, averageUsage);
    } catch (error) {
        console.error('Error adding average usage:', error);
    }
}

