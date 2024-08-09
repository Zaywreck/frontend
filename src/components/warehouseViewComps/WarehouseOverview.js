import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@/context/AppContext';
import '@/styles/componentStyles/WarehouseOverview.css';
import WarehouseSelector from './WarehouseSelector';
import WarehouseData from './WarehouseData';
import PieChartComponent from '../utils/PieChart';


const WarehouseOverview = () => {
    const { warehouseData, fetchSingleWarehouseData, loading } = useContext(AppContext);
    const [selectedWarehouse, setSelectedWarehouse] = useState('34YB');

    useEffect(() => {
        if (selectedWarehouse) {
            fetchSingleWarehouseData(selectedWarehouse);
        }
    }, [selectedWarehouse, fetchSingleWarehouseData]);

    const handleWarehouseSelect = (warehouseCode) => {
        setSelectedWarehouse(warehouseCode);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const data = warehouseData[selectedWarehouse] || [];

    return (
        <div className="warehouse-overview">
            <WarehouseSelector onSelect={handleWarehouseSelect} />
            {selectedWarehouse && (
                <>
                    <h1>Selected Warehouse: {selectedWarehouse}</h1>
                    <div className="overview-content">
                        <div className="table-section">
                            <WarehouseData data={data} />
                        </div>
                        <div className="chart-section">
                            {/* <WarehouseChart data={data} /> */}
                            <PieChartComponent data={data} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WarehouseOverview;