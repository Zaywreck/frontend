'use client'
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Table from '../utils/Table';
import InventoryAdd from './utils/InventoryAdd';
import PageSelector from '../utils/PageSelector';
import styles from '@/styles/componentStyles/InventoryManagement.module.css';

function InventoryManagement() {
    const router = useRouter();
    const { inventory, fetchAllInventory, loading, deleteFromInventory, addToInventory } = useContext(AppContext);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(50); // Minimum page size
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [newItem, setNewItem] = useState({ inventory_code: '', product_code: '', warehouse_code: '', quantity: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await fetchAllInventory(searchQuery, currentPage, rowsPerPage);
                setTotalPages(Math.ceil(data.total_count / rowsPerPage)); // Adjusted to match total_count
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };
        fetchData();
    }, [currentPage, rowsPerPage, searchQuery, fetchAllInventory]);

    const handleAddItem = async () => {
        if (loading) return;
        if (!newItem.inventory_code || !newItem.product_code || !newItem.warehouse_code || !newItem.quantity) {
            alert('Please fill out all fields');
            return;
        }
        try {
            await addToInventory(newItem);
            await fetchAllInventory(searchQuery, currentPage, rowsPerPage);
            setNewItem({ inventory_code: '', product_code: '', warehouse_code: '', quantity: '' });
        } catch (error) {
            console.error('Error adding to Inventory: ', error);
        }
    }

    const handleDeleteFromInventory = async (code) => {
        if (loading) return;
        const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
        if (confirmDelete) {
            try {
                await deleteFromInventory(code);
                await fetchAllInventory(searchQuery, currentPage, rowsPerPage);
            } catch (error) {
                console.error('Error deleting this entry: ', error);
            }
        }
    }

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to first page on page size change
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search query change
    };

    if (loading) return <div>Loading...</div>;

    const columns = ['inventory_code', 'product_code', 'warehouse_code', 'quantity'];

    const actions = [
        {
            label: 'Edit',
            handler: (row) => {
                router.push(`/admin/inventory/${row.inventory_code}`);
            }
        },
        {
            label: 'Delete',
            handler: (row) => handleDeleteFromInventory(row.inventory_code)
        }
    ];

    return (
        <div>
            <h1>Inventory Management</h1>
            <InventoryAdd newItem={newItem} setNewItem={setNewItem} handleAddItem={handleAddItem} loading={loading} />
            <input
                type="text"
                placeholder="Search in all Inventory..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchBar}
            />
            <Table columns={columns} data={inventory} actions={actions} />
            <PageSelector
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    );
}

export default InventoryManagement;
