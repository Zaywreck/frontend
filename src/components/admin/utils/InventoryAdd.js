import styles from '@/styles/componentStyles/Add.module.css';

function InventoryAdd({ newItem, setNewItem, handleAddItem, loading }) {
    return (
        <div className={styles.formContainer}>
            <input
                type="text"
                placeholder="Inventory Code"
                value={newItem.inventory_code}
                onChange={(e) => setNewItem({ ...newItem, inventory_code: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Product Code"
                value={newItem.product_code}
                onChange={(e) => setNewItem({ ...newItem, product_code: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Warehouse Code"
                value={newItem.warehouse_code}
                onChange={(e) => setNewItem({ ...newItem, warehouse_code: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <button onClick={handleAddItem} disabled={loading} className={styles.button}>Add Item</button>
        </div>
    );
}

export default InventoryAdd;