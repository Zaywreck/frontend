'use client'
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@/context/AppContext';
import Table from '../utils/Table';
import ProductAdd from './utils/ProductAdd';
import { useRouter } from 'next/navigation';


const ProductManagement = () => {
    const router = useRouter();
    const { fetchProducts, loading, products, deleteProduct,createProduct } = useContext(AppContext);
    const [newProduct, setNewProduct] = useState({ product_code: '', product_name: '', unit_price: '' });

    const handleAddProduct = async () => {
        if (loading) return;
        if (!newProduct.product_code || !newProduct.product_name || !newProduct.unit_price) {
            alert('Please fill out all fields');
            return;
        }
        try {
            await createProduct(newProduct);
            await fetchProducts();
            setNewProduct({ product_code: '', product_name: '', unit_price: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    const handleDeleteProduct = async (code) => {
        if (loading) return;
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            try {
                await deleteProduct(code);
                await fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) return <div>Loading...</div>;


    const columns = ['product_code', 'product_name', 'unit_price'];

    const actions = [
        {
            label: 'Edit',
            handler: (row) => {
                router.push(`/admin/product/${row.product_code}`);
            }
        },
        {
            label: 'Delete',
            handler: (row) => handleDeleteProduct(row.product_code)
        }
    ];
    return (
        <div>
            <h1>Product Management</h1>
            <ProductAdd newProduct={newProduct} setNewProduct={setNewProduct} handleAddProduct={handleAddProduct} loading={loading} />
            <Table columns={columns} data={products} actions={actions} />
        </div>
    );
};

export default ProductManagement;
