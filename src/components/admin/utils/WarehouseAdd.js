import styles from '@/styles/componentStyles/Add.module.css';

function WarehouseAdd({ newWarehouse, setNewWarehouse, handleAddWarehouse, loading }) {
    return (
        <div className={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Warehouse Code"
                    value={newWarehouse.warehouse_code}
                    onChange={(e) => setNewWarehouse({ ...newWarehouse, warehouse_code: e.target.value })}
                    disabled={loading}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Warehouse Name"
                    value={newWarehouse.warehouse_name}
                    onChange={(e) => setNewWarehouse({ ...newWarehouse, warehouse_name: e.target.value })}
                    disabled={loading}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="City Code"
                    value={newWarehouse.city_code}
                    onChange={(e) => setNewWarehouse({ ...newWarehouse, city_code: e.target.value })}
                    disabled={loading}
                    className={styles.input}
                />
                <button onClick={handleAddWarehouse} disabled={loading} className={styles.button}>Add Warehouse</button>
            </div>
    );
}

export default WarehouseAdd;