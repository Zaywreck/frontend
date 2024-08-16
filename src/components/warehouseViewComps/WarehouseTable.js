import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@/context/AppContext';
import Table from '../utils/Table';
import styles from '@/styles/componentStyles/WarehouseTable.module.css';

const WarehouseTable = ({ selectedWarehouse }) => {
    const { warehouseData, fetchJoinedWarehouseData, loading } = useContext(AppContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (selectedWarehouse) {
            fetchJoinedWarehouseData(selectedWarehouse);
        }
    }, [selectedWarehouse, fetchJoinedWarehouseData]);

    useEffect(() => {
        if (warehouseData[selectedWarehouse]) {
            setData(warehouseData[selectedWarehouse]);
        }
    }, [warehouseData, selectedWarehouse]);

    const columns = [
        'inventory_code', 
        'product_name',
        'warehouse_name',
        'quantity', 
        'timestamp'
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.warehouseTable}>
            <Table
                columns={columns}
                data={data}
                actions={[]}
            />
        </div>
    );
};

export default WarehouseTable;
