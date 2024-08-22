import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart } from 'chart.js';
import zoomPlugin, { pan } from 'chartjs-plugin-zoom';
import styles from '@/styles/componentStyles/charts.module.css';

Chart.register(zoomPlugin);

const BarChart = ({ data = [], title }) => {
    const [loading, setLoading] = useState(true);
    const [labels, setLabels] = useState([]);
    const [datasetData, setDatasetData] = useState([]);
    const [maxData, setMaxData] = useState(1);
    const chartRef = useRef(null);

    const prepareData = (data) => {
        let max = -Infinity;
        let values = [];

        if (title === 'Total Stock') {
            values = data.map(item => item.total_stock || 0);
        } else if (title === 'Most Used Products') {
            values = data.map(item => item.total_usage || 0);
        } else if (title === 'Months Cover') {
            values = data.map(item => item.months_cover || 0);
        } else if (title === 'Average Stock Per Warehouse') {
            values = data.map(item => item.average_stock_per_warehouse || 0);
        }

        max = Math.max(...values);
        setMaxData(max);

        setLabels(data.length > 0 ? data.map(item => item.product_name || 'Unknown') : ['No Data']);
        setDatasetData(values.length > 0 ? values : [0]);
    };

    useEffect(() => {
        prepareData(data);
        setLoading(false);
    }, [data]);

    const chartData = {
        labels,
        datasets: [{
            label: title,
            data: datasetData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`,
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    modifierKey: 'ctrl',
                    speed: 10,
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    drag: {
                        enabled: true,
                    },
                    mode: 'xy',
                },
            },
        },
        scales: {
            y: {
                type: title === 'Total Stock' ? 'logarithmic' : 'linear',
                beginAtZero: true,
                min: 0, // Ensure y-axis starts at 0
                max: maxData,
                ticks: {
                    callback: function(value) {
                        return Number(value.toFixed(2)); // Avoid scientific notation
                    },
                },
            },
        },
    };

    const handleResetZoom = () => {
        const chart = chartRef.current;
        if (chart) {
            chart.resetZoom();
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className={styles.chartContainer}>
            <h3>{title}</h3>
            <Bar ref={chartRef} data={chartData} options={options} />
            <button onClick={handleResetZoom} className={styles.resetZoomButton}>
                Reset Zoom
            </button>
        </div>
    );
};

export default BarChart;
