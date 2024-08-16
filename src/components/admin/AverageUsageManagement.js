'use client'
import { useRouter } from "next/navigation";
import AverageUsageAdd from "./utils/AverageUsageAdd";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/AppContext";
import Table from "../utils/Table";

function AverageUsageManagement() {
    const router = useRouter();
    const { averageUsage, fetchAverageUsage, fetchAllAverageUsage, loading, deleteAverageUsage, addAverageUsage } = useContext(AppContext);
    const [newAverageUsage, setNewAverageUsage] = useState({ id: '', product_code: '', warehouse_code: '', average_usage: '' });

    const handleAddAverageUsage = async () => {
        if (loading) return;
        if (!newAverageUsage.id || !newAverageUsage.product_code || !newAverageUsage.warehouse_code || !newAverageUsage.average_usage) {
            alert('Please fill out all fields');
            return;
        }
        try {
            await addAverageUsage(newAverageUsage);
            await fetchAverageUsage();
            setNewAverageUsage({ id: '', product_code: '', warehouse_code: '', average_usage: '' });
        } catch (error) {
            console.error('Error adding average usage:', error);
        }
    }

    const handleDeleteAverageUsage = async (id) => {
        if (loading) return;
        const confirmDelete = window.confirm('Are you sure you want to delete this average usage?');
        if (confirmDelete) {
            try {
                await deleteAverageUsage(id);
                await fetchAverageUsage();
            } catch (error) {
                console.error('Error deleting average usage:', error);
            }
        }
    }

    useEffect(() => {
        fetchAllAverageUsage();
    }, [fetchAllAverageUsage]);

    if (loading) return <div>Loading...</div>;

    const columns = ['id', 'product_code', 'average_usage'];
    const actions = [
        {
            label: 'Edit',
            handler: (row) => {
                router.push(`/admin/average-usage/${row.id}`);
            }
        },
        {
            label: 'Delete',
            handler: (row) => handleDeleteAverageUsage(row.id)
        }
    ];
    return (
        <div>
            <AverageUsageAdd newAverageUsage={newAverageUsage} setNewAverageUsage={setNewAverageUsage} handleAddAverageUsage={handleAddAverageUsage} loading={loading} />
            <Table data={averageUsage} columns={columns} actions={actions} />
        </div>
    );
}

export default AverageUsageManagement;