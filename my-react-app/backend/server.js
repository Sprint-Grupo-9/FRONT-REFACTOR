import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import { initRabbitMQ } from './services/rabbitmq.js';
import { startChatbotWorker } from './workers/chatbotWorker.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
// CORS configurado para aceitar requisições de qualquer origem
app.use(cors({
    origin: '*', // Permite todas as origens
    credentials: false, // Desabilitado porque '*' não funciona com credentials: true
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Chatbot API is running' });
});

// Inicializar servidor
async function startServer() {
    try {
        // Inicializar RabbitMQ
        await initRabbitMQ();
        console.log('✅ RabbitMQ conectado com sucesso!');

        // Iniciar worker do chatbot
        await startChatbotWorker();
        console.log('✅ Chatbot worker iniciado!');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

startServer();
