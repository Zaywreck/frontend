import styles from '@/styles/componentStyles/Add.module.css';

function CityAdd({ newCity, setNewCity, handleAddCity, loading }) {
    return (
        <div className={styles.formContainer}>
            <input
                type="text"
                placeholder="City Code"
                value={newCity.city_code}
                onChange={(e) => setNewCity({ ...newCity, city_code: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="City Name"
                value={newCity.city_name}
                onChange={(e) => setNewCity({ ...newCity, city_name: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Region Code"
                value={newCity.region_code}
                onChange={(e) => setNewCity({ ...newCity, region_code: e.target.value })}
                disabled={loading}
                className={styles.input}
            />
            <button onClick={handleAddCity} disabled={loading} className={styles.button}>Add City</button>
        </div>
    );
}

export default CityAdd;