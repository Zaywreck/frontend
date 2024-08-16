import styles from '@/styles/componentStyles/Add.module.css';

function AverageUsageAdd({ newAverageUsage, setNewAverageUsage, handleAddAverageUsage, loading }) {
    return (
        <div className={styles.formContainer}>
            <input
                type="text"
                placeholder="Product Code"
                value={newAverageUsage.product_code}
                onChange={(e) => setNewAverageUsage({ ...newAverageUsage, product_code: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Average Usage"
                value={newAverageUsage.average_usage}
                onChange={(e) => setNewAverageUsage({ ...newAverageUsage, average_usage: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Timestamp"
                value={newAverageUsage.timestamp}
                onChange={(e) => setNewAverageUsage({ ...newAverageUsage, timestamp: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <button onClick={handleAddAverageUsage} disabled={loading} className={styles.button}>Add Average Usage</button>
        </div>
    );
}

export default AverageUsageAdd;