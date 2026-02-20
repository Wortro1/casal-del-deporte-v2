import api from './api';

const BASE = '/booking';

export const createBooking = async (bookingData) => {
    const response = await api.post(`${BASE}/create_booking`, bookingData);
    return response.data;
};

export const getAllBookings = async () => {
    const response = await api.get(`${BASE}/all_bookings`);
    return response.data;
};

export const getBookingById = async (id) => {
    const response = await api.get(`${BASE}/boking_by_id/${id}`);
    return response.data;
};

export const updateBooking = async (id, bookingData) => {
    const response = await api.put(`${BASE}/update/${id}`, bookingData);
    return response.data;
};

export const deleteBooking = async (id) => {
    await api.delete(`${BASE}/delete_booking/${id}`);
};
