'use client'
// src/app/services/upload/page.js
import { useState } from 'react';
import axios from 'axios';
import '@/styles/Upload.css'

export default function Page() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }
        setLoading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message || 'Upload successful');
        } catch (error) {
            console.error('Error uploading file:', error);
            if (error.response) {
                console.error('Error response:', error.response);
                setMessage('Error uploading file: ' + error.response.data.detail);
            } else {
                setMessage('Error uploading file: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='upload-container'>
            <div>
                <h1>Upload a File</h1>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}
