import api from './api';

const BASE = '/administrador';

export const createAdmin = async (adminData) => {
    const response = await api.post(BASE, adminData);
    return response.data;
};

export const getAllAdmins = async () => {
    const response = await api.get(`${BASE}/alladmin`);
    return response.data;
};

export const getAdminById = async (id) => {
    const response = await api.get(`${BASE}/${id}`);
    return response.data;
};

export const updateAdmin = async (id, adminData) => {
    const response = await api.put(`${BASE}/${id}`, adminData);
    return response.data;
};

export const deleteAdmin = async (id) => {
    await api.delete(`${BASE}/${id}`);
};

export const getAllUsuarios = async () => {
    const response = await api.get(`${BASE}/usuarios/todos`);
    return response.data;
};
