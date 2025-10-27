# 🚀 Guia Rápido de Início - Chatbot IA

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Instalar RabbitMQ com Docker (Mais Fácil)

```powershell
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### 2️⃣ Instalar Dependências do Backend

```powershell
cd backend
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente

```powershell
# Criar arquivo .env
copy .env.example .env
```

Edite o arquivo `.env` e adicione sua API Key do Groq:
```env
GROQ_API_KEY=sua_chave_aqui
```

> 💡 **Sem API Key?** Não tem problema! O sistema funciona com respostas mock para testes.

### 4️⃣ Iniciar Backend

```powershell
npm run dev
```

Aguarde ver:
```
✅ RabbitMQ conectado com sucesso!
✅ Chatbot worker iniciado!
🚀 Servidor rodando na porta 3001
```

### 5️⃣ Iniciar Frontend

Em outro terminal (na pasta raiz):

```powershell
npm run dev
```

### 6️⃣ Testar! 🎉

Abra http://localhost:5173 e clique no botão de chat no canto inferior direito!

---

## 🔑 Como Obter API Key do Groq (2 minutos)

1. Acesse: https://console.groq.com
2. Faça login ou crie uma conta
3. Clique em "API Keys" no menu
4. Clique em "Create API Key"
5. Copie a chave e cole no arquivo `.env`

---

## 🐛 Problemas Comuns

### RabbitMQ não inicia?

**Solução**: Use Docker (mais simples):
```powershell
docker start rabbitmq
```

### Backend dá erro?

**Solução**: Verifique se o RabbitMQ está rodando:
```powershell
docker ps
```

### Chat não aparece?

**Solução**: 
1. Recarregue a página (Ctrl + R)
2. Verifique se o backend está rodando
3. Abra o console do navegador (F12) e veja os erros

---

## 📝 Comandos Úteis

```powershell
# Ver logs do RabbitMQ
docker logs rabbitmq

# Parar RabbitMQ
docker stop rabbitmq

# Reiniciar backend
cd backend
npm run dev

# Ver interface RabbitMQ
# Abra: http://localhost:15672
# User: guest, Password: guest
```

---

## 🎨 Personalizar Mensagens da IA

Edite: `backend/config/petshopContext.js`

Mude as informações do petshop, serviços, preços, etc.

---

## 📚 Documentação Completa

Veja `README.md` para documentação detalhada.

---

**Pronto! Seu chatbot está funcionando!** 🐾✨
