import axios from 'axios';
import { constants } from '@/context/constants';

/**
 * Logs an action performed by the user.
 * @param {Object} user - The user object containing user details.
 * @param {string} action - A brief description of the action performed.
 * @param {string} details - Additional details about the action.
 */
export async function logAction(id, action, details) {
    if (!id) {
        console.error('User ID is required to log an action');
        return;
    }
    try {
        await axios.post(`${constants.url}/log/log_action`, {
            user_id: id,
            action,
            details,
        }, {
            headers: {
                'X-API-Key': constants.api_key,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to log action:', error);
    }
}

