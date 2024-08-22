import React, { useContext, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from '@/styles/componentStyles/charts.module.css';
import AppContext from '@/context/AppContext';

const LineChart = ({ data = [], title }) => {
    const chartRef = useRef(null);
    const { loading } = useContext(AppContext);
    const labels = data.length > 0 ? data.map(item => item.product_name || 'Unknown') : ['No Data'];
    const datasetData = data.length > 0 ? data.map(item => item.months_cover || 0) : [0];

    const chartData = {
        labels,
        datasets: [{
            label: title,
            data: datasetData,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
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
                    mode: 'xy',
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
        }
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
            <Line ref={chartRef} data={chartData} options={options} />
            <button onClick={handleResetZoom} className={styles.resetZoomButton}>
                Reset Zoom
            </button>
        </div>
    );
};

export default LineChart;
