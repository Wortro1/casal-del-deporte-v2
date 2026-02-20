import axios from 'axios';

const api = axios.create({
    baseURL: '/gym/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
