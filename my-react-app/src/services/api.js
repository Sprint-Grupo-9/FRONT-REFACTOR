import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export const registerOwner = (ownerData) => {
    return api.post('/owners', ownerData);
};

export const loginOwner = async (loginData) => {
    const response = await api.post('/owners/login', loginData);
    if (response.data && response.data.token) {
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('id', response.data.id);
        console.log("ID recebido no login:", response.data.id);
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const getOwnerInformation = (id) => {
    return api.get(`/owners/${id}`);
}

export const postNewAppointment = (appointmentData) => {
    return api.post('/appointments', appointmentData);
};

export const putUserData = async (id, userData) => {
    return await api.put(`/owners/${id}`, userData);
};

export default api;