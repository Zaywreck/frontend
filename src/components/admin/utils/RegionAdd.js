import styles from '@/styles/componentStyles/Add.module.css';

function RegionAdd({ newRegion, setNewRegion, handleAddRegion, loading }) {
    return (
        <div className={styles.formContainer}>
            <input
                type="text"
                placeholder="Region Code"
                value={newRegion.region_code}
                onChange={(e) => setNewRegion({ ...newRegion, region_code: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Region Name"
                value={newRegion.region_name}
                onChange={(e) => setNewRegion({ ...newRegion, region_name: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <button onClick={handleAddRegion} disabled={loading} className={styles.button}>Add Region</button>
        </div>
    );
}

export default RegionAdd;