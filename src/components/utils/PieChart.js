import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '@/styles/componentStyles/PieChart.css';
const PieChartComponent = ({ data, limit = 10 }) => {
    const chartData = data
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, limit)
        .map(item => ({
            name: item.product_code,
            value: item.quantity,
        }));

    return (
        <div className="pie-chart-container">
            <PieChart width={600} height={600}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, value }) => `${name} (${value})`}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                />
            </PieChart>
        </div>
    );
};

export default PieChartComponent;
