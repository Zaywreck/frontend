import axios from 'axios';

const url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

export const fetchCity = async (cityCode) => {
    try {
        const response = await axios.get(`${url}/cities/${cityCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching city:', error);
    }
}

export const createCity = async (city) => {
    try {
        const response = await axios.post(`${url}/cities/create/`, city);
        return response.data;
    } catch (error) {
        console.error('Error creating city:', error);
    }
}

export const updateCity = async (city) => {
    try {
        const response = await axios.put(`${url}/cities/update/${city.city_code}`, city);
        return response.data;
    } catch (error) {
        console.error('Error updating city:', error);
    }
}

export const deleteCity = async (cityCode) => {
    try {
        const response = await axios.delete(`${url}/cities/delete/${cityCode}`);
    } catch (error) {
        console.error('Error deleting city: ', error)
    }
}

