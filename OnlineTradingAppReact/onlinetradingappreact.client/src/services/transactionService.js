import api from './api';

export const getTransactions = async () => {
    const response = await api.get('/transactions');
    return response.data;
};

export const getTransaction = async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
};

export const buyShare = async (transaction) => {
    const response = await api.post('/buy', transaction);
    return response.data;
};

export const sellShare = async (transaction) => {
    const response = await api.post('/sell', transaction);
    return response.data;
};