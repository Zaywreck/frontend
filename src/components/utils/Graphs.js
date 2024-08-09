import React, { useContext, useEffect } from 'react';
import AppContext from '@/context/AppContext';

const Graphs = ({ warehouseCode }) => {
  const { fetchSingleWarehouseData, warehouses, loading } = useContext(AppContext);

  useEffect(() => {
    fetchSingleWarehouseData(warehouseCode);
  }, [warehouseCode, fetchSingleWarehouseData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const data = warehouses[warehouseCode] || [];

  return (
    <div>
      <h1>Warehouse {warehouseCode} Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.inventory_code}>
            {item.product_code}: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Graphs;