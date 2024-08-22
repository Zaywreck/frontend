import { constants } from "@/context/constants";
import axios from "axios";
import { logAction } from "./loggerService";

const url = constants.url;


export const fetchRegion = async (code, userId) => {
    try {
        const response = await axios.get(`${url}/regions/${code}`);
        await logAction(userId, 'fetch_region', `Fetched region data for ${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching region:', error);
    }
};

export const createRegion = async (region, userId) => {
    try {
        const response = await axios.post(`${url}/regions/`, region);
        await logAction(userId, 'create_region', `Created region ${region.region_code}`);
        return response.data;
    } catch (error) {
        console.error('Error creating region:', error);
    }
};

export const deleteRegion = async (code, userId) => {
    try {
        const response = await axios.delete(`${url}/regions/${code}`);
        await logAction(userId, 'delete_region', `Deleted region ${code}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting region:', error);
    }
};

export const updateRegion = async (region, userId) => {
    try {
        const response = await axios.put(`${url}/regions/${region.region_code}`, region);
        await logAction(userId, 'update_region', `Updated region ${region.region_code}`);
        return response.data;
    } catch (error) {
        console.error('Error updating region:', error);
    }
};