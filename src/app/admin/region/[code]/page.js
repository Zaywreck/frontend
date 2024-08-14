'use client'
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';
import styles from '@/styles/componentStyles/EditPage.module.css';

function RegionEditPage({ params }) {
    const router = useRouter();
    const regionCode = params.code;
    const { fetchRegion, updateRegion } = useContext(AppContext);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        if (regionCode) {
            fetchRegion(regionCode).then(data => {
                setRegion(data);
            });
        }
    }, [regionCode, fetchRegion]);

    const handleSave = async () => {
        if (!region) return;
        try {
            await updateRegion(region);
            router.push('/admin/region');
        } catch (error) {
            console.error('Error updating region:', error);
        }
    };

    if (!region) return <div>Loading...</div>

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Edit Region {regionCode}</h1>
            <input
                type="text"
                name="region_name"
                value={region.region_name || ''}
                onChange={(e) => setRegion({ ...region, region_name: e.target.value })}
                className={styles.input}
            />
            <button onClick={handleSave} className={styles.button}>Save</button>
            <button onClick={() => router.back()} className={styles.button}>Cancel</button>
        </div>
    );
}

export default RegionEditPage;