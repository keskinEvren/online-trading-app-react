import api from './api';

export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return await response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return await response.data;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw new Error('Failed to fetch users. Please try again later.');
    }
};

export const createUser = async (user) => {
    try {
        const response = await api.post('/users', user);
        return await response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (id, user) => {
    try {
        const response = await api.put(`/user/${id}`, user);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};