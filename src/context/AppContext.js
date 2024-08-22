'use client'
import React, { createContext, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { fetchWarehouse, addWarehouse, updateWarehouse, deleteWarehouse } from '@/services/warehouseService';
import { fetchProduct, createProduct, deleteProduct, updateProduct } from '@/services/productService';
import { fetchCity, createCity, deleteCity, updateCity } from '@/services/cityService';
import { fetchRegion, createRegion, deleteRegion, updateRegion } from '@/services/regionService';
import { addToInventory, deleteFromInventory, updateInInventory, uploadFile, fetchInventoryLine } from '@/services/inventoryService';
import { fetchAverageUsage, addAverageUsage, deleteAverageUsage, updateAverageUsage } from '@/services/averageUsageService';
import { constants } from './constants';
import AuthContext from './AuthContext';

// Create the AppContext
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
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(true);
    const url = constants.url;

    const { user } = useContext(AuthContext);

    const logActionWithUser = useCallback(async (action, details) => {
        if (!user) {
            console.warn('No user context available for logging');
            return;
        }
        try {
            await axios.post(`${url}/log/log_action/`, {
                action,
                details,
                user_id: user.id, // Include user ID in log
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Error logging action:', error);
        }
    }, [url, user]);

    const fetchWarehouseData = useCallback(async () => {
        if (fetchWarehouseData.inProgress) return;
        fetchWarehouseData.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/warehouses/`);
            setWarehouses(response.data);
            await logActionWithUser('fetch_warehouses', 'Fetched all warehouse data');
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        } finally {
            fetchWarehouseData.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);

    const fetchSingleWarehouseData = useCallback(async (warehouseCode) => {
        if (fetchSingleWarehouseData.inProgress) return;
        fetchSingleWarehouseData.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/inventory/warehouse/${warehouseCode}/`);
            setWarehouseData(prev => ({ ...prev, [warehouseCode]: response.data }));
            await logActionWithUser('fetch_single_warehouse', `Fetched data for warehouse ${warehouseCode}`);
        } catch (error) {
            console.error('Error fetching warehouse data:', error);
        } finally {
            fetchSingleWarehouseData.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);

    const fetchProducts = useCallback(async () => {
        if (fetchProducts.inProgress) return;
        fetchProducts.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/products/`);
            setProducts(response.data);
            await logActionWithUser('fetch_products', 'Fetched all product data');
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            fetchProducts.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);

    const fetchCities = useCallback(async () => {
        if (fetchCities.inProgress) return;
        fetchCities.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/cities/`);
            setCities(response.data);
            await logActionWithUser('fetch_cities', 'Fetched all city data');
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            fetchCities.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);

    const fetchRegions = useCallback(async () => {
        if (fetchRegions.inProgress) return;
        fetchRegions.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/regions/`);
            setRegions(response.data);
            await logActionWithUser('fetch_regions', 'Fetched all region data');
        } catch (error) {
            console.error('Error fetching regions:', error);
        } finally {
            fetchRegions.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);

    const fetchAllInventory = useCallback(async (search = '', page = 1, pageSize = 50) => {
        if (fetchAllInventory.inProgress) return;
        fetchAllInventory.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/inventory/`, {
                params: { search, page, page_size: pageSize }
            });
            if (response && response.data) {
                setInventory(response.data.data);
                setTotalCount(response.data.total_count);
                await logActionWithUser('fetch_inventory', `Fetched inventory data with search: ${search}`);
                console.log('Returning Response Data:', response.data);  // Ensure correct data return
                return response.data;
            } else {
                console.error('API response structure is unexpected:', response);
                return undefined; // Explicitly return undefined if the structure is wrong
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        } finally {
            fetchAllInventory.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);


    const fetchJoinedWarehouseData = useCallback(async (warehouseCode) => {
        if (fetchJoinedWarehouseData.inProgress) return;
        fetchJoinedWarehouseData.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/joined/inventory`, {
                params: { warehouse_code: warehouseCode }
            });
            setWarehouseData(prev => ({ ...prev, [warehouseCode]: response.data }));
            await logActionWithUser('fetch_joined_warehouse', `Fetched joined inventory data for warehouse ${warehouseCode}`);
        } catch (error) {
            console.error('Error fetching joined inventory data:', error);
        } finally {
            fetchJoinedWarehouseData.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);

    const fetchAllAverageUsage = useCallback(async () => {
        if (fetchAllAverageUsage.inProgress) return;
        fetchAllAverageUsage.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/average/`);
            setAverageUsage(response.data);
            await logActionWithUser('fetch_average_usage', 'Fetched all average usage data');
        } catch (error) {
            console.error('Error fetching average usage:', error);
        } finally {
            fetchAllAverageUsage.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);

    const fetchAllJoinedData = useCallback(async () => {
        if (fetchAllJoinedData.inProgress) return;
        fetchAllJoinedData.inProgress = true;
        setLoading(true);
        try {
            const response = await axios.get(`${url}/joined/inventory/all`);
            setInventory(response.data);
            await logActionWithUser('fetch_all_joined_data', 'Fetched all joined inventory data');
        } catch (error) {
            console.error('Error fetching all joined data:', error);
        } finally {
            fetchAllJoinedData.inProgress = false;
            setLoading(false);
        }
    }, [url, logActionWithUser]);

    const calculateRemainingMonths = (quantity, averageConsumption) => {
        setLoading(true);
        if (quantity === 0 || averageConsumption === 0) {
            return 0;
        }
        let remainingDays = quantity / averageConsumption;
        if (remainingDays < 0) {
            return 'Faulty data';
        }
        if (remainingDays === Infinity) {
            return 0;
        }
        return Math.round(remainingDays);
    };

    const fetchInventorySummary = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/joined/inventory/summary`);
            await logActionWithUser('fetch_inventory_summary', 'Fetched inventory summary');
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory summary:', error);
        }
    }, [url, logActionWithUser]);

    const fetchViewData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/views/dashboard_data`);
            await logActionWithUser('fetch_view_data', 'Fetched view data');
            setDashboardData(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching view data:', error);
            return {}; // Ensure you return a fallback value
        } finally {
            setLoading(false);
        }
    }, [url, logActionWithUser]);    

    const values = {
        fetchWarehouse,
        createProduct,
        updateWarehouse,
        deleteWarehouse,
        warehouses,
        warehouseData,
        fetchJoinedWarehouseData,
        fetchWarehouseData,
        fetchInventorySummary,
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
        // --------------
        fetchAllJoinedData,
        calculateRemainingMonths,
        logActionWithUser,
        fetchViewData,
        dashboardData,
        loading
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
