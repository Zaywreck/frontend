import React, { useState } from 'react';
import '@/styles/componentStyles/WarehouseData.css';

const WarehouseData = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter(item => 
        item.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.inventory_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            <div className="table-container">
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Inventory Code</th>
                            <th>Product Code</th>
                            <th>Quantity</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.inventory_code}>
                                <td>{item.inventory_code}</td>
                                <td>{item.product_code}</td>
                                <td>{item.quantity}</td>
                                <td>{new Date(item.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseData;
