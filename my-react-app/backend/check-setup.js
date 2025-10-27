import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function checkSetup() {
    console.log('🔍 Verificando pré-requisitos do Chatbot...\n');
    console.log('📦 Node.js:', process.version);

    const checks = [
        {
            name: 'Dependências do backend',
            path: join(__dirname, 'node_modules'),
            solution: 'Execute: npm install'
        },
        {
            name: 'Arquivo .env',
            path: join(__dirname, '.env'),
            solution: 'Copie .env.example para .env e configure'
        },
        {
            name: 'Configuração do Groq',
            check: () => {
                if (!existsSync(join(__dirname, '.env'))) return false;
                const envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
                return envContent.includes('GROQ_API_KEY') && !envContent.includes('your_groq_api_key_here');
            },
            solution: 'Configure GROQ_API_KEY no arquivo .env'
        }
    ];

    console.log('\n📋 Verificações:\n');

    for (const check of checks) {
        const exists = typeof check.check === 'function'
            ? check.check()
            : existsSync(check.path);

        if (exists) {
            console.log(`✅ ${check.name}`);
        } else {
            console.log(`❌ ${check.name}`);
            console.log(`   💡 Solução: ${check.solution}\n`);
        }
    }

    console.log('\n🐰 RabbitMQ:');
    console.log('   Execute: docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management');
    console.log('   Ou instale manualmente de: https://www.rabbitmq.com/download.html');

    console.log('\n🚀 Para iniciar:');
    console.log('   1. npm run dev (neste diretório)');
    console.log('   2. npm run dev (no diretório raiz para o frontend)');
    console.log('   3. Abra http://localhost:5173\n');
}

checkSetup();
