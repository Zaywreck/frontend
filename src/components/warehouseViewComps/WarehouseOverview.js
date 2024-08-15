import React, { useState, useEffect, useContext } from 'react';
import AppContext from '@/context/AppContext';
import styles from '@/styles/componentStyles/WarehouseOverview.module.css';
import WarehouseSelector from './WarehouseSelector';
import PieChartComponent from '../utils/PieChart';
import Table from '../utils/Table';

const WarehouseOverview = () => {
    const { warehouseData, fetchJoinedWarehouseData, loading } = useContext(AppContext);
    const [selectedWarehouse, setSelectedWarehouse] = useState('34YB');

    useEffect(() => {
        if (selectedWarehouse) {
            fetchJoinedWarehouseData(selectedWarehouse);
        }
    }, [selectedWarehouse, fetchJoinedWarehouseData]);

    const handleWarehouseSelect = (warehouseCode) => {
        setSelectedWarehouse(warehouseCode);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const data = warehouseData[selectedWarehouse] || [];
    const columns = [
        'inventory_code', 
        'product_name',
        'warehouse_name',
        'quantity', 
        'timestamp'
    ];

    return (
        <div className={styles.warehouseOverview}>
            <WarehouseSelector onSelect={handleWarehouseSelect} selectedWarehouse={selectedWarehouse} />
            {selectedWarehouse && (
                <>
                    <h1>Selected Warehouse: {selectedWarehouse}</h1>
                    <div className={styles.overviewContent}>
                        <div className={styles.tableSection}>
                            <Table
                                columns={columns}
                                data={data}
                                actions={[]}
                            />
                        </div>
                        <div className={styles.chartSection}>
                            <PieChartComponent data={data} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WarehouseOverview;
