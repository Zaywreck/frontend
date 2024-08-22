import AppContext from "@/context/AppContext";
import { useEffect, useState, useContext } from "react";
import styles from "@/styles/componentStyles/Alert.module.css";

function AlertComponent() {
    const [alerts, setAlerts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openWarehouse, setOpenWarehouse] = useState(null);
    const { fetchInventorySummary } = useContext(AppContext); // Access fetchInventorySummary from context

    useEffect(() => {
        const getInventorySummary = async () => {
            const data = await fetchInventorySummary();
            if (data) {
                setAlerts(data);
            }
        };

        getInventorySummary();
    }, [fetchInventorySummary]);

    // Group alerts by warehouse_code
    const groupedAlerts = alerts.reduce((acc, item) => {
        (acc[item.warehouse_code] = acc[item.warehouse_code] || []).push(item);
        return acc;
    }, {});

    // Filter warehouses based on search term
    const filteredGroupedAlerts = Object.entries(groupedAlerts).filter(([warehouseCode]) =>
        warehouseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Toggle dropdown
    const handleDropdownClick = (warehouseCode) => {
        setOpenWarehouse(openWarehouse === warehouseCode ? null : warehouseCode);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Search warehouse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBar}
            />
            <h1>Alert List</h1>
            {filteredGroupedAlerts.length > 0 ? (
                <div className={styles.grid}>
                    {filteredGroupedAlerts.map(([warehouseCode, items]) => (
                        <div key={warehouseCode} className={styles.box}>
                            <div
                                className={styles.box}
                                onClick={() => handleDropdownClick(warehouseCode)}
                            >
                                <strong>Warehouse Code: {warehouseCode}</strong>
                            </div>
                            <div
                                className={`${styles.dropdownContent} ${openWarehouse === warehouseCode ? styles.show : ''}`}
                            >
                                {items.map((item) => (
                                    <div key={item.product_code} className={styles.item}>
                                        <p className={styles.itemTitle}>{item.product_name}</p>
                                        <p className={styles.itemDetails}>Quantity: {item.quantity}</p>
                                        <p className={styles.itemDetails}>Product Code: {item.product_code}</p>
                                        <p className={styles.itemDetails}>Average Usage: {item.average_usage}</p>
                                        <p className={styles.itemDetails}>Remaining Months: {item.remaining_months}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.noAlerts}>No alerts</p>
            )}
        </div>
    );
}

export default AlertComponent;
