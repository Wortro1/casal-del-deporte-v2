import api from './api';

const BASE = '/task_type';

export const createTaskType = async (taskData) => {
    const response = await api.post(BASE, taskData);
    return response.data;
};

export const getAllTaskTypes = async () => {
    const response = await api.get(`${BASE}/all_task`);
    return response.data;
};

export const getTaskTypeById = async (id) => {
    const response = await api.get(`${BASE}/look_task_id/${id}`);
    return response.data;
};

export const updateTaskType = async (id, taskData) => {
    const response = await api.put(`${BASE}/update_task/${id}`, taskData);
    return response.data;
};

export const deleteTaskType = async (id) => {
    await api.delete(`${BASE}/delete_task/${id}`);
};
