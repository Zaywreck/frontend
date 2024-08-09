import React, { useContext, useEffect } from 'react';
import AppContext from '@/context/AppContext';

const ProductManagement = () => {
    const { fetchProducts, products, loading } = useContext(AppContext);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Product Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_code}>
                            <td>{product.product_code}</td>
                            <td>{product.product_name}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;
