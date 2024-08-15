import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@/context/AppContext';

const WarehouseSelector = ({ onSelect, selectedWarehouse }) => {
    const { warehouses, fetchWarehouseData } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWarehouseData().finally(() => setLoading(false));
    }, [fetchWarehouseData]);

    const handleChange = (e) => {
        onSelect(e.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <select onChange={handleChange}>
            <option value="">{selectedWarehouse}</option>
            {warehouses.map(warehouse => (
                <option key={warehouse.warehouse_code} value={warehouse.warehouse_code}>
                    {warehouse.warehouse_name}
                </option>
            ))}
        </select>
    );
};

export default WarehouseSelector;
