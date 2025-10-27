import amqp from 'amqplib';

let connection = null;
let channel = null;

const QUEUE_NAME = 'chatbot_messages';
const RESPONSE_QUEUE_NAME = 'chatbot_responses';

export async function initRabbitMQ() {
    try {
        const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

        connection = await amqp.connect(rabbitmqUrl);
        channel = await connection.createChannel();

        // Criar filas
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        await channel.assertQueue(RESPONSE_QUEUE_NAME, { durable: true });

        console.log('RabbitMQ initialized successfully');

        // Handler para reconexão
        connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
            setTimeout(initRabbitMQ, 5000);
        });

        connection.on('close', () => {
            console.log('RabbitMQ connection closed. Reconnecting...');
            setTimeout(initRabbitMQ, 5000);
        });

        return { connection, channel };
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        throw error;
    }
}

export function getChannel() {
    if (!channel) {
        throw new Error('RabbitMQ channel not initialized');
    }
    return channel;
}

export async function publishMessage(message) {
    try {
        const ch = getChannel();
        const messageBuffer = Buffer.from(JSON.stringify(message));

        ch.sendToQueue(QUEUE_NAME, messageBuffer, {
            persistent: true,
            contentType: 'application/json'
        });

        console.log('Message published to queue:', message.messageId);
        return true;
    } catch (error) {
        console.error('Error publishing message:', error);
        throw error;
    }
}

export async function consumeMessages(callback) {
    try {
        const ch = getChannel();

        await ch.consume(QUEUE_NAME, async (msg) => {
            if (msg) {
                const content = JSON.parse(msg.content.toString());
                console.log('Message received from queue:', content.messageId);

                try {
                    await callback(content);
                    ch.ack(msg);
                } catch (error) {
                    console.error('Error processing message:', error);
                    // Reenviar mensagem para a fila em caso de erro
                    ch.nack(msg, false, true);
                }
            }
        }, { noAck: false });

        console.log('Started consuming messages from queue');
    } catch (error) {
        console.error('Error consuming messages:', error);
        throw error;
    }
}

export async function publishResponse(response) {
    try {
        const ch = getChannel();
        const responseBuffer = Buffer.from(JSON.stringify(response));

        ch.sendToQueue(RESPONSE_QUEUE_NAME, responseBuffer, {
            persistent: true,
            contentType: 'application/json'
        });

        console.log('Response published to queue:', response.messageId);
        return true;
    } catch (error) {
        console.error('Error publishing response:', error);
        throw error;
    }
}

export { QUEUE_NAME, RESPONSE_QUEUE_NAME };
