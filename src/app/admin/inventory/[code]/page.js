'use client'
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';
import styles from '@/styles/componentStyles/EditPage.module.css';

function InventoryEditPage({ params }) {
    const router = useRouter();
    const inventoryCode = params.code;
    const { fetchInventoryLine, updateInventory } = useContext(AppContext);
    const [inventory, setInventory] = useState(null);

    useEffect(() => {
        if (inventoryCode) {
            fetchInventoryLine(inventoryCode).then(data => {
                setInventory(data);
            });
        } else {
            setInventory({ inventory_code: '', product_code: '', warehouse_code: '', quantity: '' });
        }
    }, [inventoryCode, fetchInventoryLine]);

    const handleSave = async () => {
        if (!inventory) return;
        try {
            await updateInventory(inventory);
            router.push('/admin/inventory');
        } catch (error) {
            console.error('Error updating inventory:', error);
        }
    };

    if (!inventory) return <div>Loading...</div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Inventory {inventoryCode}</h1>
            <input
                type="text"
                name="inventory_code"
                value={inventory.inventory_code || ''}
                onChange={(e) => setInventory({ ...inventory, inventory_code: e.target.value })}
                className={styles.input}
            />
            <input
                type="text"
                name="product_code"
                value={inventory.product_code || ''}
                onChange={(e) => setInventory({ ...inventory, product_code: e.target.value })}
                className={styles.input}
            />
            <input
                type="text"
                name="warehouse_code"
                value={inventory.warehouse_code || ''}
                onChange={(e) => setInventory({ ...inventory, warehouse_code: e.target.value })}
                className={styles.input}
            />
            <input
                type="text"
                name="quantity"
                value={inventory.quantity || ''}
                onChange={(e) => setInventory({ ...inventory, quantity: e.target.value })}
                className={styles.input}
            />
            <button onClick={handleSave} className={styles.button}>Save</button>
            <button onClick={() => router.back()} className={styles.button}>Cancel</button>
        </div>
    );
}

export default InventoryEditPage;