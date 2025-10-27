import axios from 'axios';

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:3001/api/chat';

const chatApi = axios.create({
    baseURL: CHATBOT_API_URL,
    timeout: 35000, // 35 segundos
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para tratamento de erros
chatApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            throw new Error('A requisição demorou muito tempo. Por favor, tente novamente.');
        }

        if (!error.response) {
            console.error('Network error');
            throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
        }

        throw error;
    }
);

/**
 * Enviar mensagem para o chatbot
 * @param {string} message - Mensagem do usuário
 * @param {string|null} conversationId - ID da conversa (opcional)
 * @returns {Promise<Object>} Resposta da API
 */
export async function sendMessage(message, conversationId = null) {
    try {
        const response = await chatApi.post('/message', {
            message,
            conversationId
        });

        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

/**
 * Obter histórico de conversa
 * @param {string} conversationId - ID da conversa
 * @returns {Promise<Object>} Histórico de mensagens
 */
export async function getConversationHistory(conversationId) {
    try {
        const response = await chatApi.get(`/conversation/${conversationId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting conversation:', error);
        throw error;
    }
}

/**
 * Deletar conversa
 * @param {string} conversationId - ID da conversa
 * @returns {Promise<Object>} Confirmação
 */
export async function deleteConversation(conversationId) {
    try {
        const response = await chatApi.delete(`/conversation/${conversationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting conversation:', error);
        throw error;
    }
}

export default chatApi;
