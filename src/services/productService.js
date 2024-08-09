// productService.js
import axios from 'axios';

const url = 'http://127.0.0.1:8000';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${url}/products/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const fetchProduct = async (productCode) => {
    const response = await axios.get(`${url}/product/${productCode}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(`${url}/create/`, product);
    return response.data;
};

export const updateProduct = async (product) => {
    const response = await axios.put(`${url}/update/${product.product_code}`, product);
    return response.data;
};

export const deleteProduct = async (productCode) => {
    await axios.delete(`${url}/delete/${productCode}`);
};
