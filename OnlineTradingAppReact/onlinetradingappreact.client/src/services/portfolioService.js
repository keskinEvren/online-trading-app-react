import api from './api';

export const getPortfolios = async () => {
    const response = await api.get('/portfolios');
    return response.data;
};

export const getPortfolio = async (id) => {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
};

export const createPortfolio = async (portfolio) => {
    const response = await api.post('/portfolios', portfolio);
    return response.data;
};

export const updatePortfolio = async (id, portfolio) => {
    const response = await api.put(`/portfolios/${id}`, portfolio);
    return response.data;
};

export const deletePortfolio = async (id) => {
    const response = await api.delete(`/portfolios/${id}`);
    return response.data;
};