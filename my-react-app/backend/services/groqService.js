import Groq from 'groq-sdk';
import { SYSTEM_PROMPT } from '../config/petshopContext.js';
import { MODEL_CONFIGS } from '../config/groqModels.js';

let groqClient = null;

function initGroqClient() {
    if (!groqClient) {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey || apiKey === 'your_groq_api_key_here') {
            console.warn('⚠️  GROQ_API_KEY not configured. Using mock responses.');
            return null;
        }

        groqClient = new Groq({
            apiKey: apiKey
        });
    }

    return groqClient;
}

export async function getAIResponse(userMessage, conversationHistory = []) {
    try {
        const client = initGroqClient();

        // Se não tiver API key configurada, retornar resposta mock
        if (!client) {
            return getMockResponse(userMessage);
        }

        // Preparar mensagens para a API
        const messages = [
            SYSTEM_PROMPT,
            ...conversationHistory.slice(-10).map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];

        // Fazer chamada para Groq API com configuração otimizada
        const config = MODEL_CONFIGS.chatbot;
        const chatCompletion = await client.chat.completions.create({
            messages: messages,
            model: config.model,
            temperature: config.temperature,
            max_tokens: config.max_tokens,
            top_p: config.top_p,
            stream: false
        });

        const response = chatCompletion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';

        return response;
    } catch (error) {
        console.error('Error calling Groq API:', error);

        // Em caso de erro, retornar resposta de fallback
        return 'Desculpe, estou com dificuldades técnicas no momento. Por favor, tente novamente em alguns instantes ou entre em contato diretamente conosco. 📞';
    }
}

// Resposta mock para quando a API key não estiver configurada
function getMockResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('horário') || lowerMessage.includes('horario') || lowerMessage.includes('funciona')) {
        return '🕐 Nosso horário de funcionamento é:\n\n• Segunda a Sexta: 8h às 18h\n• Sábados: 8h às 14h\n• Domingos e feriados: Fechado\n\nPosso ajudar com mais alguma coisa?';
    }

    if (lowerMessage.includes('banho') || lowerMessage.includes('tosa')) {
        return '🛁 Oferecemos diversos serviços de banho e tosa:\n\n• Banho simples\n• Banho com tosa higiênica\n• Tosa completa\n• Hidratação\n\nOs preços variam conforme o porte do animal. Gostaria de agendar um horário?';
    }

    if (lowerMessage.includes('veterinário') || lowerMessage.includes('veterinario') || lowerMessage.includes('consulta')) {
        return '🏥 Nosso serviço veterinário oferece:\n\n• Consultas gerais\n• Vacinação\n• Exames\n• Cirurgias\n• Atendimento de emergências\n\nTemos veterinários especializados em cães, gatos e pequenos animais. Quer agendar uma consulta?';
    }

    if (lowerMessage.includes('agendar') || lowerMessage.includes('agendamento') || lowerMessage.includes('marcar')) {
        return '📅 Para agendar, você pode:\n\n1. Usar nosso sistema de agendamento online no site\n2. Ligar para nós: (XX) XXXX-XXXX\n3. Vir pessoalmente à nossa loja\n\nQual serviço você gostaria de agendar?';
    }

    if (lowerMessage.includes('preço') || lowerMessage.includes('preco') || lowerMessage.includes('quanto custa') || lowerMessage.includes('valor')) {
        return '💰 Nossos preços variam de acordo com:\n\n• Tipo de serviço\n• Porte do animal\n• Raça e tipo de pelagem\n\nPara um orçamento exato, entre em contato conosco com as informações do seu pet. Qual serviço te interessa?';
    }

    if (lowerMessage.includes('oi') || lowerMessage.includes('olá') || lowerMessage.includes('ola') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde') || lowerMessage.includes('boa noite')) {
        return '👋 Olá! Bem-vindo ao PetShop Columbia! 🐾\n\nSou seu assistente virtual e estou aqui para ajudar com informações sobre:\n\n• Serviços (banho, tosa, veterinário)\n• Horários e agendamentos\n• Dúvidas sobre cuidados com pets\n\nComo posso ajudar você hoje?';
    }

    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada') || lowerMessage.includes('valeu')) {
        return '😊 Por nada! Fico feliz em ajudar! Se precisar de mais alguma coisa, é só me chamar. Cuide bem do seu pet! 🐾❤️';
    }

    // Resposta padrão
    return '🐾 Olá! Sou o assistente virtual do PetShop Care.\n\nPosso ajudar com informações sobre:\n• Serviços (banho, tosa, veterinário, taxi pet, hotel)\n• Horários de funcionamento\n• Agendamentos\n• Cuidados com pets\n\nComo posso ajudar você hoje?';
}

export { initGroqClient };
