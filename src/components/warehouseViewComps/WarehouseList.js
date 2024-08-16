// src/components/WarehouseList.js
import React from 'react';
import styles from '@/styles/componentStyles/WarehouseList.module.css';

const WarehouseList = ({ warehouses, onWarehouseClick }) => {
  return (
    <div className={styles.warehouseList}>
      <ul>
        {warehouses.map((warehouse) => (
          <li key={warehouse.warehouse_code} onClick={() => onWarehouseClick(warehouse)}>
            {warehouse.warehouse_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseList;
