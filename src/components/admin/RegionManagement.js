'use client'
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@/context/AppContext';
import Table from '../utils/Table';
import { useRouter } from 'next/navigation';
import RegionAdd from './utils/RegionAdd';
import AuthContext from '@/context/AuthContext';

function RegionManagement() {
    const router = useRouter();
    const { fetchRegions, loading, regions, deleteRegion, createRegion } = useContext(AppContext);
    const [newRegion, setNewRegion] = useState({ region_code: '', region_name: '' });
    const { user } = useContext(AuthContext);

    const handleAddRegion = async () => {
        if (loading) return;
        if (!newRegion.region_code || !newRegion.region_name) {
            alert('Please fill out all fields');
            return;
        }
        try {
            await createRegion(newRegion, user.id);
            await fetchRegions();
            setNewRegion({ region_code: '', region_name: '' });
        } catch (error) {
            console.error('Error adding region:', error);
        }
    };

    const handleDeleteRegion = async (code) => {
        if (loading) return;
        const confirmDelete = window.confirm('Are you sure you want to delete this region?');
        if (confirmDelete) {
            try {
                await deleteRegion(code, user.id);
                await fetchRegions();
            } catch (error) {
                console.error('Error deleting region:', error);
            }
        }
    }

    useEffect(() => {
        fetchRegions();
    }, [fetchRegions]);

    if (loading) return <div>Loading...</div>

    const columns = ['region_code', 'region_name'];
    const actions = [
        {
            label: 'Edit',
            handler: (row) => {
                router.push(`/admin/region/${row.region_code}`);
            }
        },
        {
            label: 'Delete',
            handler: (row) => handleDeleteRegion(row.region_code)
        }
    ];

    return (
        <div>
            <h1>Region Management</h1>
            <RegionAdd newRegion={newRegion} setNewRegion={setNewRegion} handleAddRegion={handleAddRegion} loading={loading} />
            <Table columns={columns} data={regions} actions={actions} />
        </div>
    );
}

export default RegionManagement;