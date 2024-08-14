import { constants } from "@/context/constants";
import axios from "axios";

const url = constants.url;


export const fetchRegion = async (code) => {
    try {
        const response = await axios.get(`${url}/regions/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching region:', error);
    }
};

export const createRegion = async (region) => {
    try {
        const response = await axios.post(`${url}/regions/`, region);
        return response.data;
    } catch (error) {
        console.error('Error creating region:', error);
    }
};

export const deleteRegion = async (code) => {
    try {
        const response = await axios.delete(`${url}/regions/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting region:', error);
    }
};

export const updateRegion = async (region) => {
    try {
        const response = await axios.put(`${url}/regions/${region.region_code}`, region);
        return response.data;
    } catch (error) {
        console.error('Error updating region:', error);
    }
};