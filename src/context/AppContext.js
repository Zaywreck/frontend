'use client'
import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { fetchWarehouse, addWarehouse, updateWarehouse, deleteWarehouse } from '@/services/warehouseService';
import { fetchProduct, createProduct, deleteProduct, updateProduct } from '@/services/productService';
import { fetchCity, createCity, deleteCity, updateCity } from '@/services/cityService';
import { fetchRegion, createRegion, deleteRegion, updateRegion } from '@/services/regionService';
import { addToInventory, deleteFromInventory, updateInInventory, uploadFile, fetchInventoryLine } from '@/services/inventoryService';
import { fetchAverageUsage, addAverageUsage,deleteAverageUsage,updateAverageUsage } from '@/services/averageUsageService';
import { constants } from './constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);
    const [cities, setCities] = useState([]);
    const [regions, setRegions] = useState([]);
    const [warehouseData, setWarehouseData] = useState({});
    const [inventory, setInventory] = useState([]);
    const [averageUsage, setAverageUsage] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const url = constants.url;

    const fetchWarehouseData = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/warehouses/`);
            setWarehouses(response.data);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const fetchSingleWarehouseData = useCallback(async (warehouseCode) => {
        try {
            const response = await axios.get(`${url}/inventory/warehouse/${warehouseCode}/`);
            setWarehouseData(prev => ({ ...prev, [warehouseCode]: response.data }));
        } catch (error) {
            console.error('Error fetching warehouse data:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/products/`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const fetchCities = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/cities/`);
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const fetchRegions = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/regions/`);
            setRegions(response.data);
        } catch (error) {
            console.error('Error fetching regions:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const fetchAllInventory = useCallback(async (search = '', page = 1, pageSize = 50) => {
        try {
            const response = await axios.get(`${url}/inventory/`, {
                params: {
                    search: search,
                    page: page,
                    page_size: pageSize
                }
            });
            setInventory(response.data.data);
            setTotalCount(response.data.total_count);
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [url]);

    const fetchJoinedWarehouseData = useCallback(async (warehouseCode) => {
        setLoading(true);
    
        try {
            const response = await axios.get(`${url}/joined/inventory`, {
                params: { warehouse_code: warehouseCode }
            });
            setWarehouseData(prev => ({ ...prev, [warehouseCode]: response.data }));
            console.log('response.data:', response.data);
        } catch (error) {
            console.error('Error fetching joined inventory data:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const fetchAllAverageUsage = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/average/`);
            setAverageUsage(response.data);
        } catch (error) {
            console.error('Error fetching average usage:', error);
        } finally {
            setLoading(false);
        }
    }, [url]);
    


    const values = {
        fetchWarehouse,
        createProduct,
        updateWarehouse,
        deleteWarehouse,
        warehouses,
        warehouseData,
        fetchJoinedWarehouseData,
        fetchWarehouseData,
        fetchSingleWarehouseData,
        addWarehouse,
        uploadFile,
        // -------------
        fetchProduct,
        fetchProducts,
        deleteProduct,
        updateProduct,
        products,
        setProducts,
        //--------------
        fetchCities,
        createCity,
        fetchCity,
        deleteCity,
        updateCity,
        cities,
        setCities,
        // --------------
        fetchRegions,
        fetchRegion,
        regions,
        setRegions,
        createRegion,
        deleteRegion,
        updateRegion,
        // --------------
        fetchAllInventory,
        addToInventory,
        deleteFromInventory,
        updateInInventory,
        inventory,
        setInventory,
        totalCount,
        setTotalCount,
        fetchInventoryLine,
        // --------------
        fetchAllAverageUsage,
        fetchAverageUsage,
        addAverageUsage,
        deleteAverageUsage,
        updateAverageUsage,
        averageUsage,
        setAverageUsage,
        loading
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
