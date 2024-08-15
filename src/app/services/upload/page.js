'use client'
// src/app/services/upload/page.js
import { useState } from 'react';
import axios from 'axios';
import styles from '@/styles/upload.module.css'
import { constants } from '@/context/constants';

export default function Page() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const url = constants.url + '/inventory/upload/';

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
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message || 'Upload successful');
        } catch (error) {
            console.error('Error uploading file. if the file ending is not ordinal it may caused problem rest of the is uploaded:', error);
            if (error.response) {
                console.error('Error response. if the file ending is not ordinal it may caused problem rest of the is uploaded: ', error.response);
                setMessage('Error uploading file. if the file ending is not ordinal it may caused problem rest of the is uploaded: ' + error.response.data.detail);
            } else {
                setMessage('Error uploading file. if the file ending is not ordinal it may caused problem rest of the is uploaded: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.uploadContainer}>
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
