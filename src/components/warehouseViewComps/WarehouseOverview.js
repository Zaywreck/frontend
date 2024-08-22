import React, { useState, useEffect, useContext } from 'react';
import AppContext from '@/context/AppContext';
import styles from '@/styles/componentStyles/WarehouseOverview.module.css';
import WarehouseSelector from './WarehouseSelector';
import PieChartComponent from '../utils/PieChart';
import Table from '../utils/Table';

const WarehouseOverview = () => {
    const { warehouseData, fetchJoinedWarehouseData, loading, calculateRemainingMonths, fetchWarehouse } = useContext(AppContext);
    const [selectedWarehouse, setSelectedWarehouse] = useState('34YB');
    const [warehouse, setWarehouse] = useState({warehouse_name: '34YB'});

    useEffect(() => {
        if (selectedWarehouse) {
            fetchJoinedWarehouseData(selectedWarehouse);
        }
    }, [selectedWarehouse, fetchJoinedWarehouseData]);

    const handleWarehouseSelect = async (warehouseCode) => {
        try{
            setSelectedWarehouse(warehouseCode);
            await fetchWarehouse(warehouseCode).then((data) => {
                setWarehouse(data);
            });
        } catch (error) {
            console.error('Error fetching warehouse:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const data = warehouseData[selectedWarehouse] || [];
    const columns = [
        'inventory_code',
        'product_name',
        'quantity',
        'average_consumption',
        'timestamp'
    ];

    return (
        <div className={styles.warehouseOverview}>
            <WarehouseSelector onSelect={handleWarehouseSelect} selectedWarehouse={selectedWarehouse} />
            {selectedWarehouse && (
                <>
                    <h1>Selected Warehouse: {warehouse.warehouse_name}</h1>
                    <div className={styles.overviewContent}>
                        <div className={styles.tableSection}>
                            <Table
                                data={data}
                                columns={columns}
                                actions={[]}
                                calculateRemainingMonths={calculateRemainingMonths}
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
