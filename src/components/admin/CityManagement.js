'use client'
import AppContext from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import {useRouter} from 'next/navigation';
import CityAdd from "./utils/CityAdd";
import Table from "../utils/Table";

function CityManagement() {
    const router = useRouter();
    const { cities, fetchCities, createCity, deleteCity, loading } = useContext(AppContext);
    const [newCity, setNewCity] = useState({ city_code: '', city_name: '', region_code: '' });

    const handleAddCity = async () => {
        if (loading) return;
        if (!newCity.city_code || !newCity.city_name || !newCity.region_code) {
            alert('Please fill out all fields');
            return;
        }
        try {
            await createCity(newCity);
            await fetchCities();
            setNewCity({ city_code: '', city_name: '', region_code: '' });
        } catch (error) {
            console.error('Error adding city:', error);
        }
    }

    const handleDeleteCity = async (code) => {
        if (loading) return;
        const confirmDelete = window.confirm('Are you sure you want to delete this city?');
        if (confirmDelete) {
            try {
                await deleteCity(code);
                await fetchCities();
            } catch (error) {
                console.error('Error deleting city:', error);
            }
        }
    }

    useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    if (loading) return <div>Loading...</div>;

    const columns = ['city_code', 'city_name', 'region_code'];
    const actions = [
        {
            label: 'Edit',
            handler: (row) => {
                router.push(`/admin/city/${row.city_code}`);
            }
        },
        {
            label: 'Delete',
            handler: (row) => handleDeleteCity(row.city_code)
        }
    ];

    return (
        <div>
            <h1>City Management</h1>
            <CityAdd newCity={newCity} setNewCity={setNewCity} handleAddCity={handleAddCity} loading={loading} />
            <Table columns={columns} data={cities} actions={actions} />
        </div>
    );
}

export default CityManagement;