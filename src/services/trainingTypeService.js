import api from './api';

const BASE = '/tipos-entrenamiento';

export const getAllTrainingTypes = async () => {
    const response = await api.get(BASE);
    return response.data;
};

export const getTrainingTypeById = async (id) => {
    const response = await api.get(`${BASE}/${id}`);
    return response.data;
};

export const createTrainingType = async (trainingData) => {
    const response = await api.post(BASE, trainingData);
    return response.data;
};

export const updateTrainingType = async (id, trainingData) => {
    const response = await api.put(`${BASE}/${id}`, trainingData);
    return response.data;
};

export const deleteTrainingType = async (id) => {
    await api.delete(`${BASE}/${id}`);
};
