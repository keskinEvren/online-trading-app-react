import api from './api';

export const getShares = async () => {
    const response = await api.get('/shares');
    return response.data;
};

export const getShare = async (id) => {
    const response = await api.get(`/shares/${id}`);
    return response.data;
};

export const createShare = async (share) => {
    const response = await api.post('/shares', share);
    return response.data;
};

export const updateShare = async (id, share) => {
    const response = await api.put(`/shares/${id}`, share);
    return response.data;
};

export const deleteShare = async (id) => {
    const response = await api.delete(`/shares/${id}`);
    return response.data;
};