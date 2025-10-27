import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { publishMessage } from '../services/rabbitmq.js';
import { getAIResponse } from '../services/groqService.js';

const router = express.Router();

// Armazenar conversas em memória (em produção, usar Redis ou banco de dados)
const conversations = new Map();
const pendingResponses = new Map();

// Enviar mensagem para o chatbot
router.post('/message', async (req, res) => {
    try {
        const { message, conversationId } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Criar ou recuperar conversação
        const convId = conversationId || uuidv4();

        if (!conversations.has(convId)) {
            conversations.set(convId, []);
        }

        const messageId = uuidv4();

        // Adicionar mensagem do usuário à conversa
        const userMessage = {
            id: messageId,
            role: 'user',
            content: message.trim(),
            timestamp: new Date().toISOString()
        };

        conversations.get(convId).push(userMessage);

        // Publicar mensagem na fila RabbitMQ
        await publishMessage({
            messageId,
            conversationId: convId,
            userMessage: message.trim(),
            conversationHistory: conversations.get(convId)
        });

        // Criar promise para aguardar resposta
        const responsePromise = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                pendingResponses.delete(messageId);
                reject(new Error('Timeout waiting for response'));
            }, 30000); // 30 segundos timeout

            pendingResponses.set(messageId, { resolve, reject, timeout });
        });

        try {
            const aiResponse = await responsePromise;

            // Adicionar resposta da IA à conversa
            conversations.get(convId).push({
                id: uuidv4(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date().toISOString()
            });

            res.json({
                conversationId: convId,
                messageId,
                response: aiResponse,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error waiting for AI response:', error);
            res.status(500).json({ error: 'Failed to get AI response' });
        }
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Obter histórico de conversa
router.get('/conversation/:conversationId', (req, res) => {
    try {
        const { conversationId } = req.params;

        if (!conversations.has(conversationId)) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json({
            conversationId,
            messages: conversations.get(conversationId)
        });
    } catch (error) {
        console.error('Error getting conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Deletar conversa
router.delete('/conversation/:conversationId', (req, res) => {
    try {
        const { conversationId } = req.params;

        if (conversations.has(conversationId)) {
            conversations.delete(conversationId);
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Função para resolver promessas pendentes (chamada pelo worker)
export function resolveResponse(messageId, response) {
    if (pendingResponses.has(messageId)) {
        const { resolve, timeout } = pendingResponses.get(messageId);
        clearTimeout(timeout);
        resolve(response);
        pendingResponses.delete(messageId);
    }
}

export function rejectResponse(messageId, error) {
    if (pendingResponses.has(messageId)) {
        const { reject, timeout } = pendingResponses.get(messageId);
        clearTimeout(timeout);
        reject(error);
        pendingResponses.delete(messageId);
    }
}

export default router;
