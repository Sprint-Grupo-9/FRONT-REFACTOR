import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
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

// Auto-logout on 401 responses and redirect to home
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('id');
            } catch { }
            // Avoid crashing if window is undefined in some environments
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        }
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

// DEPRECATED: Este endpoint está marcado como deprecated no backend
// Mantenha para compatibilidade, mas considere remover funcionalidade de exclusão
export const deletePet = async (petId) => {
    console.warn('⚠️ DELETE /pets/{id} está DEPRECATED no backend. Esta funcionalidade pode ser removida em breve.');
    return await api.delete(`/pets/${petId}`);
};

export const getPetDetails = async (petId) => {
    const ownerId = localStorage.getItem('id');
    return await api.get(`/pets/${petId}/${ownerId}`);
};

export const getAllPetOfferings = async () => {
    return await api.get('/pet-offerings');
};

export const getPetOfferingById = async (id) => {
    return await api.get(`/pet-offerings/${id}`);
};

export const getPetOfferingsPricesByPet = async (petId, petOfferingIds) => {
    const params = new URLSearchParams({
        petOfferingIds: petOfferingIds.join(',')
    });
    return await api.get(`/pet-offerings/price/${petId}?${params}`);
};

// Manter compatibilidade com código antigo (deprecated)
export const getAllServices = async () => {
    console.warn('getAllServices está deprecated. Use getAllPetOfferings');
    return await getAllPetOfferings();
};

export const getServiceById = async (id) => {
    console.warn('getServiceById está deprecated. Use getPetOfferingById');
    return await getPetOfferingById(id);
};

export const getEmployeesByServices = async (serviceIds) => {
    console.warn('getEmployeesByServices está deprecated. Use getAvailableEmployees com petOfferingIds');
    // Converte para o novo formato
    return await api.get(`/employees/by-pet-offerings?${serviceIds.map(id => `petOfferingIds=${id}`).join('&')}`);
};

// Buscar funcionários disponíveis para os serviços selecionados (nova função)
export const getAvailableEmployees = async (petOfferingIds) => {
    const params = petOfferingIds.map(id => `petOfferingIds=${id}`).join('&');
    return await api.get(`/employees/by-pet-offerings?${params}`);
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

export const getAppointmentsByOwner = async (page = 0, size = 10) => {
    const ownerId = localStorage.getItem('id');
    if (!ownerId) {
        throw new Error('ID do proprietário não encontrado');
    }
    const response = await api.get(`/appointments/owner/${ownerId}`, {
        params: { page, size }
    });
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