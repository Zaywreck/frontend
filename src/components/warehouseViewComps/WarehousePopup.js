'use client';
import Table from '../utils/Table';
import AppContext from '@/context/AppContext';
import { useContext, useEffect, useState } from 'react';

function WarehousePopup({ warehouseCode }) {
    const { warehouseData, fetchJoinedWarehouseData, loading } = useContext(AppContext);
    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        if (warehouseCode) {
            fetchJoinedWarehouseData(warehouseCode);
        }
    }, [warehouseCode, fetchJoinedWarehouseData]);

    // Sync localData with context warehouseData
    useEffect(() => {
        if (warehouseData && typeof warehouseData === 'object') {
            // Extract data for the specific warehouseCode
            const dataForWarehouse = warehouseData[warehouseCode] || [];
            setLocalData(dataForWarehouse);
        }
    }, [warehouseData, warehouseCode]);

    const columns = [
        'inventory_code',
        'product_name',
        'warehouse_name',
        'quantity',
        'timestamp'
    ];
    const actions = [];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Array.isArray(localData) || localData.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <Table data={localData} columns={columns} actions={actions} />
        </div>
    );
}

export default WarehousePopup;
