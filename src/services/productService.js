import { constants } from '@/context/constants';
import axios from 'axios';

const url = constants.url;

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${url}/products/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const fetchProduct = async (productCode) => {
    try {
        const response = await axios.get(`${url}/products/${productCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

export const createProduct = async (product) => {
    const response = await axios.post(`${url}/products/create/`, product);
    return response.data;
};

export const updateProduct = async (product) => {
    const response = await axios.put(`${url}/products/update/${product.product_code}`, product);
    return response.data;
};

export const deleteProduct = async (productCode) => {
    await axios.delete(`${url}/products/delete/${productCode}`);
};
