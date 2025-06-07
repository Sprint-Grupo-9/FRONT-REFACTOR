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
    },
    (error) => {
        return Promise.reject(error);
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

export const updateOwner = async (id, ownerData) => {
    return await api.put(`/owners/${id}`, ownerData);
};

export const getAllPetsByOwnerId = async (ownerId) => {
    return await api.get(`/pets/all/${ownerId}`);
};

export const createPet = async (ownerId, petData) => {
    return await api.post(`/pets/${ownerId}`, petData);
};

export const updatePet = async (petId, petData) => {
    return await api.put(`/pets/${petId}`, petData);
};

export const deletePet = async (petId) => {
    return await api.delete(`/pets/${petId}`);
};

export const getPetDetails = async (petId) => {
    return await api.get(`/pets/${petId}`);
};

export const getAllServices = async () => {
    return await api.get('/services');
};

export const getServiceById = async (id) => {
    return await api.get(`/services/${id}`);
};

export const getEmployeesByServices = async (serviceIds) => {
    const params = new URLSearchParams({
        serviceIds: serviceIds.join(',')
    });
    return await api.get(`/services/employees?${params}`);
};

// Funções para gerenciar agendamentos
export const createAppointment = async (appointmentData) => {
    try {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateAppointment = async (id, appointmentData) => {
    return await api.put(`/appointments/${id}`, appointmentData);
};

export const deleteAppointment = async (id) => {
    return await api.delete(`/appointments/${id}`);
};

export const getAppointmentsByOwner = async () => {
    const ownerId = localStorage.getItem('id');
    if (!ownerId) {
        throw new Error('ID do proprietário não encontrado');
    }
    const response = await api.get(`/appointments/${ownerId}`);
    return response.data;
};

export const getAvailableTimes = async (petId, requestData) => {
    try {
        const response = await api.post(`/appointments/available-times/${petId}`, requestData);
        return response;
    } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        throw error;
    }
};

export const cancelAppointment = async (appointmentId) => {
    try {
        const response = await api.delete(`/appointments/${appointmentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;