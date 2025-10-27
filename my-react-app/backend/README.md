# 🤖 Chatbot com IA - PetShop Care

Sistema de chatbot inteligente integrado ao sistema do PetShop, utilizando IA da Groq Cloud, fila de mensagens RabbitMQ e interface React moderna.

## 📋 Índice

- [Características](#características)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Sistema](#executando-o-sistema)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Funciona](#como-funciona)
- [Personalização](#personalização)

## ✨ Características

- 🤖 **IA Conversacional**: Utiliza Groq Cloud (Llama 3.3 70B) para respostas inteligentes
- 📨 **Fila de Mensagens**: RabbitMQ para processamento assíncrono
- 💬 **Interface Moderna**: Chat animado com Framer Motion
- 🐾 **Contexto Especializado**: IA treinada para responder sobre serviços de petshop
- 🎨 **Design Responsivo**: Interface bonita e funcional
- ⚡ **Tempo Real**: Respostas rápidas e fluidas

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v16 ou superior) - [Download](https://nodejs.org/)
- **RabbitMQ** - [Instruções de instalação abaixo](#instalando-rabbitmq)
- **Conta Groq Cloud** - [Criar conta e obter API Key](#obtendo-api-key-groq)

### Instalando RabbitMQ

#### Windows

1. Baixe e instale o Erlang: https://www.erlang.org/downloads
2. Baixe e instale o RabbitMQ: https://www.rabbitmq.com/install-windows.html
3. Execute o RabbitMQ:
   ```powershell
   rabbitmq-server
   ```

#### MacOS (usando Homebrew)

```bash
brew install rabbitmq
brew services start rabbitmq
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install rabbitmq-server
sudo systemctl start rabbitmq-server
sudo systemctl enable rabbitmq-server
```

#### Docker (Alternativa mais fácil)

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Para acessar a interface de gerenciamento: http://localhost:15672 (usuário: `guest`, senha: `guest`)

### Obtendo API Key Groq

1. Acesse: https://console.groq.com
2. Crie uma conta ou faça login
3. Vá para a seção "API Keys"
4. Clique em "Create API Key"
5. Copie a chave gerada

## 📦 Instalação

### 1. Instalar dependências do Backend

```powershell
cd backend
npm install
```

### 2. Instalar dependências do Frontend (se necessário)

```powershell
cd ..
npm install
```

## ⚙️ Configuração

### Backend

1. Copie o arquivo de exemplo:
   ```powershell
   cd backend
   copy .env.example .env
   ```

2. Edite o arquivo `.env` e configure:
   ```env
   PORT=3001
   RABBITMQ_URL=amqp://localhost:5672
   GROQ_API_KEY=sua_api_key_aqui
   FRONTEND_URL=http://localhost:5173
   ```

### Frontend

1. Copie o arquivo de exemplo (se ainda não existir):
   ```powershell
   copy .env.example .env
   ```

2. Edite o arquivo `.env`:
   ```env
   VITE_CHATBOT_API_URL=http://localhost:3001/api/chat
   ```

## 🚀 Executando o Sistema

### 1. Iniciar RabbitMQ

Se instalou via Docker:
```powershell
docker start rabbitmq
```

Ou se instalou diretamente:
```powershell
rabbitmq-server
```

### 2. Iniciar o Backend

```powershell
cd backend
npm run dev
```

Você verá:
```
✅ RabbitMQ conectado com sucesso!
✅ Chatbot worker iniciado!
🚀 Servidor rodando na porta 3001
```

### 3. Iniciar o Frontend

Em outro terminal:
```powershell
npm run dev
```

### 4. Acessar o Sistema

Abra seu navegador em: http://localhost:5173

Você verá um botão de chat flutuante no canto inferior direito! 🎉

## 📁 Estrutura do Projeto

```
backend/
├── config/
│   └── petshopContext.js      # Contexto e personalidade da IA
├── routes/
│   └── chatRoutes.js          # Rotas da API
├── services/
│   ├── groqService.js         # Integração com Groq
│   └── rabbitmq.js            # Gerenciamento RabbitMQ
├── workers/
│   └── chatbotWorker.js       # Worker que processa mensagens
├── .env                       # Configurações (criar)
├── .env.example               # Exemplo de configuração
├── package.json               # Dependências
└── server.js                  # Servidor principal

src/
├── components/
│   └── system/
│       └── ChatButton.jsx     # Componente do chat
└── services/
    └── chatService.js         # Cliente API do chat
```

## 🔄 Como Funciona

1. **Usuário clica no botão de chat** → Interface abre
2. **Usuário envia mensagem** → Frontend chama API
3. **API recebe mensagem** → Publica na fila RabbitMQ
4. **Worker consome fila** → Processa com Groq AI
5. **Resposta da IA** → Retorna para o frontend
6. **Usuário vê resposta** → Continua conversa

```
Frontend (React)
      ↓
   API REST
      ↓
   RabbitMQ (Fila)
      ↓
   Worker (Chatbot)
      ↓
   Groq Cloud AI
      ↓
   Resposta → Usuário
```

## 🎨 Personalização

### Modificar o Contexto da IA

Edite `backend/config/petshopContext.js`:

```javascript
export const PETSHOP_CONTEXT = `
Você é um assistente virtual...
// Adicione ou modifique informações aqui
`;
```

### Mudar Aparência do Chat

Edite `src/components/system/ChatButton.jsx`:

- Cores do gradiente
- Tamanho da janela
- Posição do botão
- Animações

### Adicionar Novos Endpoints

Edite `backend/routes/chatRoutes.js`:

```javascript
router.post('/novo-endpoint', async (req, res) => {
  // Sua lógica aqui
});
```

## 🐛 Solução de Problemas

### RabbitMQ não conecta

```
❌ Failed to connect to RabbitMQ
```

**Solução**: Verifique se o RabbitMQ está rodando:
```powershell
# Verificar status (Docker)
docker ps | findstr rabbitmq

# Ou verificar serviço Windows
Get-Service RabbitMQ
```

### Erro de API Key Groq

```
⚠️ GROQ_API_KEY not configured
```

**Solução**: 
1. Verifique se copiou a API key corretamente no `.env`
2. Reinicie o servidor backend
3. Se não tiver API key, o sistema usa respostas mock

### Chat não aparece

**Solução**:
1. Verifique se o backend está rodando (porta 3001)
2. Abra o console do navegador (F12) e procure erros
3. Verifique a URL da API no `.env` do frontend

### Mensagens não são enviadas

**Solução**:
1. Verifique conexão com backend
2. Veja logs do terminal do backend
3. Confirme que RabbitMQ está funcionando

## 🎯 Próximos Passos

Sugestões de melhorias:

- [ ] Persistir conversas em banco de dados
- [ ] Adicionar autenticação de usuários
- [ ] Implementar notificações push
- [ ] Adicionar suporte a anexos (imagens)
- [ ] Criar dashboard de analytics
- [ ] Implementar feedback de usuários
- [ ] Adicionar suporte multilíngue

## 📝 Notas Importantes

- **Modo Mock**: Se não configurar a API Key do Groq, o sistema funciona com respostas pré-definidas
- **Produção**: Para produção, use Redis para cache e PostgreSQL para persistência
- **Segurança**: Adicione rate limiting e validação de entrada
- **Escalabilidade**: Considere usar múltiplos workers RabbitMQ

## 🤝 Suporte

Se tiver problemas:

1. Verifique os logs do backend
2. Verifique o console do navegador
3. Confirme que todos os serviços estão rodando
4. Revise as configurações nos arquivos `.env`

## 📄 Licença

Este projeto é parte do sistema PetShop Care.

---

Desenvolvido com ❤️ e 🐾 para PetShop Care
