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
                <Link href="/admin/orders" className="button">
                    Manage Orders
                </Link>
                <Link href="/admin/customers" className="button">
                    Manage Customers
                </Link>
                <Link href="/admin/reports" className="button">
                    Manage Reports
                </Link>
            </div>
        </div>            
    );
};

export default AdminDashboard;
