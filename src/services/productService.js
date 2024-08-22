import { constants } from '@/context/constants';
import axios from 'axios';
import { logAction } from '@/services/loggerService';

const url = constants.url;

export const fetchProducts = async (userId) => {
    try {
        const response = await axios.get(`${url}/products/`);
        await logAction(userId, 'fetch_products', 'Fetched all product data'); // Log action
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const fetchProduct = async (productCode, userId) => {
    try {
        const response = await axios.get(`${url}/products/${productCode}`);
        await logAction(userId, 'fetch_product', `Fetched product data for ${productCode}`); // Log action
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

export const createProduct = async (product, userId) => {
    try {
        const response = await axios.post(`${url}/products/create/`, product);
        await logAction(userId, 'create_product', `Created product ${product.product_code}`); // Log action
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
    }
};

export const updateProduct = async (product, userId) => {
    try {
        const response = await axios.put(`${url}/products/update/${product.product_code}`, product);
        await logAction(userId, 'update_product', `Updated product ${product.product_code}`); // Log action
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

export const deleteProduct = async (productCode, userId) => {
    try {
        await axios.delete(`${url}/products/delete/${productCode}`);
        await logAction(userId, 'delete_product', `Deleted product ${productCode}`); // Log action
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};
