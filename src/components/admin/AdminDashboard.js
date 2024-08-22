import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import styles from "@/styles/admin.module.css";
import Table from '../utils/Table';
import BarChart from '../utils/BarChart';
import LineChart from '../utils/LineChart';
import AppContext from '@/context/AppContext';

const AdminDashboard = () => {
    const { fetchViewData, loading } = useContext(AppContext);

    const [data, setData] = useState({
        totalStock: [],
        totalProducts: 0,
        totalWarehouses: 0,
        averageStockPerWarehouse: [],
        mostUsedProducts: [],
        monthsCover: [],
        stockByRegion: [],
    });

    useEffect(() => {
        fetchViewData().then((res) => {
            setData({
                totalStock: res.total_stock || [],
                totalProducts: res.total_products[0].total_products,
                totalWarehouses: res.total_warehouses[0].total_warehouses,
                mostUsedProducts: res.most_used_products || [],
                monthsCover: res.months_cover || [],
                stockByRegion: res.stock_by_region || [],
                averageStockPerWarehouse: res.average_stock_per_warehouse || [],
            });
        });
    }, [fetchViewData]);
    console.log(data);
    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <div className={styles.buttonGrid}>
                <Link href="/admin/warehouse" className={styles.button}>Manage Warehouses</Link>
                <Link href="/admin/product" className={styles.button}>Manage Products</Link>
                <Link href="/admin/city" className={styles.button}>Manage Cities</Link>
                <Link href="/admin/region" className={styles.button}>Manage Regions</Link>
                <Link href="/admin/inventory" className={styles.button}>Manage Inventory</Link>
                <Link href="/admin/average-usage" className={styles.button}>Manage Average Usage</Link>
            </div>

            <div className={styles.visualizations}>
                <div className={styles.chartContainer}>
                    <BarChart data={data.totalStock} title="Total Stock" />
                    <BarChart data={data.mostUsedProducts} title="Most Used Products" />
                    <LineChart data={data.monthsCover} title="Months Cover" />
                    <BarChart data={data.averageStockPerWarehouse} title="Average Stock Per Warehouse" />
                </div>
                <div className={styles.statsContainer}>
                    <div className={styles.stat}>
                        <h3>Total Products</h3>
                        <p>{data.totalProducts}</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>Total Warehouses</h3>
                        <p>{data.totalWarehouses}</p>
                    </div>
                </div>
                <div className={styles.adminTableContainer}>
                    <h4 className={styles.tableHeader}>Stock By Region</h4>
                    <Table
                        columns={['region_name', 'total_stock']}
                        data={data.stockByRegion}
                        actions={[]}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
