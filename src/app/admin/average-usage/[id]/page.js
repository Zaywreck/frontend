'use client'
import AppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/componentStyles/EditPage.module.css";

function EditAverageUsage({ params }) {
    const id = params.id;
    const router = useRouter();
    const { fetchAverageUsage, updateAverageUsage } = useContext(AppContext);
    const [newAverageUsage, setNewAverageUsage] = useState({ id: '', product_code: '', warehouse_code: '', average_usage: '' });

    useEffect(() => {
        if (id) {
            fetchAverageUsage(id).then(data => {
                setNewAverageUsage(data);
            });
        }
    }, [id, fetchAverageUsage]);

    const handleSave = async () => {
        if (!newAverageUsage) return;
        try {
            await updateAverageUsage(newAverageUsage);
            router.push('/admin/average-usage');
        } catch (error) {
            console.error('Error updating average usage:', error);
        }
    };

    if (!newAverageUsage) return <div>Loading...</div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Average Usage {id}</h1>
            <input
                type="text"
                name="product_code"
                value={newAverageUsage.product_code || ''}
                onChange={(e) => setNewAverageUsage({ ...newAverageUsage, product_code: e.target.value })}
                className={styles.input}
            />
            <input
                type="text"
                name="average_usage"
                value={newAverageUsage.average_usage || ''}
                onChange={(e) => setNewAverageUsage({ ...newAverageUsage, average_usage: e.target.value })}
                className={styles.input}
            />
            <button onClick={handleSave} className={styles.button}>Save</button>
            <button onClick={() => router.back()} className={styles.button}>Cancel</button>
        </div>
    );
}

export default EditAverageUsage;