import Link from "next/link";
import styles from "@/styles/admin.module.css";

const AdminDashboard = () => {
    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <div className={styles.buttonGrid}>
                <Link href="/admin/warehouse" className={styles.button}>
                    Manage Warehouses
                </Link>
                <Link href="/admin/product" className={styles.button}>
                    Manage Products
                </Link>
                <Link href="/admin/city" className={styles.button}>
                    Manage Cities
                </Link>
                <Link href="/admin/region" className={styles.button}>
                    Manage Regions
                </Link>
                <Link href="/admin/inventory" className={styles.button}>
                    Manage Inventory
                </Link>
                <Link href="/admin/average-usage" className={styles.button}>
                    Manage Average Usage
                </Link>
            </div>
        </div>            
    );
};

export default AdminDashboard;
