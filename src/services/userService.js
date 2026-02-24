import api from './api';

const BASE = '/usuarios-externos';

export const registerUser = async (userData) => {
    const response = await api.post(BASE, userData);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await api.get(`${BASE}/${id}`);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await api.put(`${BASE}/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    await api.delete(`${BASE}/${id}`);
};
