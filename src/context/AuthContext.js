'use client'
import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { constants } from './constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const url = constants.url;
    const api_key = constants.api_key;

    const logout = useCallback(() => {
        localStorage.removeItem('access_token');
        setUser(null);
    }, []);

    const fetchUserFromToken = useCallback(async (token) => {
        try {
            const response = await axios.get(`${url}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'api_key': api_key,
                },
            });
            setUser(response.data);
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
            } else {
                console.error('Error fetching user from token:', error);
            }
        } finally {
            setLoading(false);
        }
    }, [url, api_key, logout]);

    const login = useCallback(async (email, password) => {
        try {
            const response = await axios.post(`${url}/auth/login`, {
                email,
                password,
                username: ""
            }, {
                headers: {
                    'accept': 'application/json',
                    'api-key': api_key,
                    'Content-Type': 'application/json',
                },
            });
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            return fetchUserFromToken(access_token);
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw new Error('Login failed');
        }
    }, [fetchUserFromToken, url, api_key]);

    const register = useCallback(async (email, password) => {
        try {
            const response = await axios.post(`${url}/auth/register`, {
                email,
                password,
            }, {
                headers: {
                    'X-API-Key': api_key,
                    'Content-Type': 'application/json',
                },
            });
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            fetchUserFromToken(access_token);
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error('Registration failed');
        }
    }, [fetchUserFromToken, url, api_key]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchUserFromToken(token);
        } else {
            setLoading(false);
        }
    }, [fetchUserFromToken]);

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
