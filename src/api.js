import axios from 'axios';
import handleApiError from './hooks/handleApiError';

const baseURL = 'http://localhost:4000'; // Replace with your API base URL

const axiosInstance = axios.create({
    baseURL,
    timeout: 5000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
        // Add any other common headers here
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(handleApiError(error)) // handle api errors
);

const makeApiRequest = async (method, url, data = null) => {
    try {
        const response = await axiosInstance({ method, url, data });
        return response.data;
    } catch (error) {
        console.log(error, "error found from api call");
        // The error is automatically handled by the interceptor
        // You can still customize error handling if needed
    }
};

// Dummy usage
export const login = async (payload) => {
    return makeApiRequest('post', '/login', {
        username: 'user1', password: 'password1'
    });
};
