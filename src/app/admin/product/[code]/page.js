'use client'
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';
import styles from '@/styles/componentStyles/EditPage.module.css';

const EditProductPage = ({ params }) => {
    const router = useRouter();
    const productCode = params.code;
    const { fetchProduct, updateProduct } = useContext(AppContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productCode) {
            fetchProduct(productCode).then(data => {
                setProduct(data);
            });
        }
    }, [productCode, fetchProduct]);

    const handleSave = async () => {
        if (!product) return;
        try {
            await updateProduct(product);
            router.push('/admin/product');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Product {productCode}</h1>
            <input
                type="text"
                name="product_name"
                value={product.product_name || ''}
                onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
                className={styles.input}
            />
            <input
                type="text"
                name="unit_price"
                value={product.unit_price || ''}
                onChange={(e) => setProduct({ ...product, unit_price: e.target.value })}
                className={styles.input}
            />
            <button onClick={handleSave} className={styles.button}>Save</button>
            <button onClick={() => router.back()} className={styles.button}>Cancel</button>
        </div>
    );
};

export default EditProductPage;
