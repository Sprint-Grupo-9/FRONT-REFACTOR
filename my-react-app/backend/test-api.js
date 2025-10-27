import axios from 'axios';

const API_URL = 'http://localhost:3001/api/chat';

console.log('🧪 Testando API do Chatbot...\n');

async function testChatbot() {
    try {
        // Teste 1: Enviar primeira mensagem
        console.log('📤 Teste 1: Enviando primeira mensagem...');
        const response1 = await axios.post(`${API_URL}/message`, {
            message: 'Olá! Qual o horário de funcionamento?'
        });

        console.log('✅ Resposta recebida!');
        console.log('Conversa ID:', response1.data.conversationId);
        console.log('Resposta:', response1.data.response);
        console.log('');

        const conversationId = response1.data.conversationId;

        // Teste 2: Continuar conversa
        console.log('📤 Teste 2: Continuando conversa...');
        const response2 = await axios.post(`${API_URL}/message`, {
            message: 'Quanto custa um banho para cachorro?',
            conversationId: conversationId
        });

        console.log('✅ Resposta recebida!');
        console.log('Resposta:', response2.data.response);
        console.log('');

        // Teste 3: Obter histórico
        console.log('📤 Teste 3: Obtendo histórico...');
        const response3 = await axios.get(`${API_URL}/conversation/${conversationId}`);

        console.log('✅ Histórico obtido!');
        console.log('Total de mensagens:', response3.data.messages.length);
        console.log('');

        console.log('🎉 Todos os testes passaram com sucesso!');

    } catch (error) {
        console.error('❌ Erro nos testes:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Dados:', error.response.data);
        }
    }
}

// Executar testes
testChatbot();
