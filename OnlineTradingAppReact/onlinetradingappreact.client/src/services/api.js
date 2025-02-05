import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // .NET Core API'nizin doğru portu
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Global error handling
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Server tarafından dönen hata
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // İstek yapıldı ama cevap alınamadı
            console.error('Network Error:', error.request);
        } else {
            // İstek oluşturulurken hata oluştu
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;