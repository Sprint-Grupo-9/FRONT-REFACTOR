import { consumeMessages } from '../services/rabbitmq.js';
import { getAIResponse } from '../services/groqService.js';
import { resolveResponse, rejectResponse } from '../routes/chatRoutes.js';

export async function startChatbotWorker() {
    console.log('🤖 Starting chatbot worker...');

    await consumeMessages(async (message) => {
        try {
            const { messageId, userMessage, conversationHistory } = message;

            console.log(`Processing message ${messageId}: "${userMessage}"`);

            // Obter resposta da IA
            const aiResponse = await getAIResponse(userMessage, conversationHistory);

            console.log(`AI response for ${messageId}: "${aiResponse.substring(0, 50)}..."`);

            // Resolver a promise pendente na rota
            resolveResponse(messageId, aiResponse);
        } catch (error) {
            console.error('Error in chatbot worker:', error);
            rejectResponse(message.messageId, error);
        }
    });
}
