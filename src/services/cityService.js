import { constants } from '@/context/constants';
import axios from 'axios';
import { logAction } from './loggerService';

const url = constants.url;

export const fetchCity = async (cityCode, userId) => {
    try {
        const response = await axios.get(`${url}/cities/${cityCode}`);
        await logAction(userId, 'fetch_city', `Fetched city data for ${cityCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching city:', error);
    }
}

export const createCity = async (city, userId) => {
    try {
        const response = await axios.post(`${url}/cities/create/`, city);
        await logAction(userId, 'create_city', `Created city ${city.city_code}`);
        return response.data;
    } catch (error) {
        console.error('Error creating city:', error);
    }
}

export const updateCity = async (city, userId) => {
    try {
        const response = await axios.put(`${url}/cities/update/${city.city_code}`, city);
        await logAction(userId, 'update_city', `Updated city ${city.city_code}`);
        return response.data;
    } catch (error) {
        console.error('Error updating city:', error);
    }
}

export const deleteCity = async (cityCode, userId) => {
    try {
        await axios.delete(`${url}/cities/delete/${cityCode}`);
        await logAction(userId, 'delete_city', `Deleted city ${cityCode}`);
    } catch (error) {
        console.error('Error deleting city: ', error)
    }
}

