import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AppContext from '@/context/AppContext';

const EditProductPage = () => {
    const router = useRouter();
    const { productCode } = router.query;
    const { fetchProduct, updateProduct } = useContext(AppContext);
    const [product, setProduct] = useState(null);
    const [productName, setProductName] = useState('');

    useEffect(() => {
        if (productCode) {
            fetchProduct(productCode).then(data => {
                setProduct(data);
                setProductName(data.product_name);
            });
        }
    }, [productCode, fetchProduct]);

    const handleSave = async () => {
        await updateProduct({ product_code: productCode, product_name: productName });
        router.push('/product-management');
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Product</h1>
            <label>
                Product Name:
                <input 
                    type="text" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)} 
                />
            </label>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default EditProductPage;
