'use client'
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';
import styles from '@/styles/componentStyles/EditPage.module.css';
import AuthContext from '@/context/AuthContext';

function CityEditPage({ params }) {
    const router = useRouter();
    const cityCode = params.code;
    const { fetchCity, updateCity } = useContext(AppContext);
    const [city, setCity] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (cityCode) {
            fetchCity(cityCode).then(data => {
                setCity(data);
            });
        }
    }, [cityCode, fetchCity]);

    const handleSave = async () => {
        if (!city) return;
        try {
            await updateCity(city, user.id);
            router.push('/admin/city');
        } catch (error) {
            console.error('Error updating city:', error);
        }
    };

    if (!city) return <div>Loading...</div>
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit City {cityCode}</h1>
            <input
                type="text"
                name="city_name"
                value={city.city_name || ''}
                onChange={(e) => setCity({ ...city, city_name: e.target.value })}
                className={styles.input}
            />
            <input
                type="text"
                name="region_code"
                value={city.region_code || ''}
                onChange={(e) => setCity({ ...city, region_code: e.target.value })}
                className={styles.input}
            />
            <button onClick={handleSave} className={styles.button}>Save</button>
            <button onClick={() => router.back()} className={styles.button}>Cancel</button>
        </div>
    );
}

export default CityEditPage;