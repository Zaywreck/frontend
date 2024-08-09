import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/componentStyles/WarehouseChart.css';

const WarehouseChart = ({ data, limit = 10 }) => {
    const chartData = data
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, limit)
        .map(item => ({
            name: item.product_code,
            quantity: item.quantity,
        }));

    return (
        <div className="bar-chart-container">
            <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default WarehouseChart;
