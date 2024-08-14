import Link from "next/link";
import '@/styles/AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className='dashboard-container'>
            <h1 className="title">Admin Dashboard</h1>
            <div className="buttonGrid">
                <Link href="/admin/warehouse" className="button">
                    Manage Warehouses
                </Link>
                <Link href="/admin/product" className="button">
                    Manage Products
                </Link>
                <Link href="/admin/city" className="button">
                    Manage Cities
                </Link>
                <Link href="/admin/region" className="button">
                    Manage Regions
                </Link>
                <Link href="/admin/inventory" className="button">
                    Manage Inventory
                </Link>
            </div>
        </div>            
    );
};

export default AdminDashboard;
