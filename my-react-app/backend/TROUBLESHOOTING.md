# 🔧 Solução de Problemas - Chatbot IA

## Problemas Comuns e Soluções

### ❌ Erro: "model has been decommissioned"

**Problema:**
```
Error: The model `llama-3.1-70b-versatile` has been decommissioned
```

**Causa:** O modelo Groq foi descontinuado.

**Solução:** ✅ **JÁ CORRIGIDO!** 
- O código agora usa `llama-3.3-70b-versatile` (modelo atual)
- Configuração centralizada em `config/groqModels.js`
- Para atualizar futuramente, edite apenas esse arquivo

**Verificar modelos disponíveis:**
https://console.groq.com/docs/models

---

### ❌ RabbitMQ Connection Error

**Problema:**
```
Failed to connect to RabbitMQ
```

**Soluções:**

1. **Verificar se RabbitMQ está rodando:**
   ```powershell
   # Docker
   docker ps | findstr rabbitmq
   
   # Se não estiver rodando
   docker start rabbitmq
   ```

2. **Se não tiver RabbitMQ instalado:**
   ```powershell
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```

3. **Verificar porta:**
   - Padrão: `amqp://localhost:5672`
   - Edite `.env` se estiver em porta diferente

4. **Ver logs:**
   ```powershell
   docker logs rabbitmq
   ```

---

### ❌ Backend não inicia

**Problema:**
```
Error: Cannot find module...
```

**Solução:**
```powershell
cd backend
rm -rf node_modules
rm package-lock.json
npm install
```

---

### ❌ API Key inválida

**Problema:**
```
Error: Invalid API key
```

**Soluções:**

1. **Verificar se API key está configurada:**
   ```powershell
   # Ver conteúdo do .env
   cat .env
   ```

2. **Recriar API key:**
   - Acesse: https://console.groq.com/keys
   - Delete chave antiga
   - Crie nova chave
   - Atualize `.env`

3. **Reiniciar servidor:**
   ```powershell
   # Parar (Ctrl+C) e reiniciar
   npm run dev
   ```

---

### ❌ Timeout ao enviar mensagens

**Problema:**
```
Request timeout / ECONNABORTED
```

**Soluções:**

1. **Verificar se backend está respondendo:**
   ```powershell
   curl http://localhost:3001/health
   ```

2. **Aumentar timeout** (se Groq estiver lento):
   
   Edite `src/services/chatService.js`:
   ```javascript
   timeout: 60000, // 60 segundos
   ```

3. **Verificar logs do backend:**
   - Veja o terminal onde rodou `npm run dev`

---

### ❌ Chat não aparece no frontend

**Problema:** Botão de chat não está visível.

**Soluções:**

1. **Verificar importação:**
   ```javascript
   // App.jsx deve ter:
   import ChatButton from './components/system/ChatButton';
   ```

2. **Limpar cache do navegador:**
   - Pressione `Ctrl + Shift + R` (Windows)
   - Ou `Cmd + Shift + R` (Mac)

3. **Verificar console do navegador:**
   - Abra DevTools (F12)
   - Veja erros na aba Console

---

### ❌ Mensagens não são processadas

**Problema:** Mensagem enviada mas sem resposta.

**Soluções:**

1. **Verificar worker:**
   - Procure por "Chatbot worker iniciado" nos logs

2. **Verificar fila RabbitMQ:**
   - Interface: http://localhost:15672
   - User: `guest`, Password: `guest`
   - Veja se há mensagens pendentes

3. **Testar API diretamente:**
   ```powershell
   cd backend
   npm run test
   ```

---

### ❌ Erro CORS

**Problema:**
```
Access to fetch blocked by CORS policy
```

**Solução:**

1. **Verificar .env do backend:**
   ```env
   FRONTEND_URL=http://localhost:5173
   ```

2. **Verificar .env do frontend:**
   ```env
   VITE_CHATBOT_API_URL=http://localhost:3001/api/chat
   ```

3. **Reiniciar ambos os servidores**

---

### ⚠️ Modo Mock (sem API key)

**Comportamento:** Respostas pré-definidas ao invés de IA.

**Como saber:**
```
⚠️ GROQ_API_KEY not configured. Using mock responses.
```

**Para ativar IA:**
1. Obtenha API key: https://console.groq.com
2. Configure em `.env`
3. Reinicie backend

---

## 🧪 Testes e Diagnóstico

### Verificar instalação completa
```powershell
cd backend
npm run check
```

### Testar API do chatbot
```powershell
cd backend
npm run test
```

### Ver logs detalhados
```powershell
# Backend (adicione DEBUG)
$env:DEBUG="*"
npm run dev
```

### Testar endpoint de saúde
```powershell
curl http://localhost:3001/health
```

### Verificar RabbitMQ Management
Abra: http://localhost:15672
- User: `guest`
- Password: `guest`

---

## 📊 Logs Importantes

### Sucesso na inicialização:
```
✅ RabbitMQ conectado com sucesso!
✅ Chatbot worker iniciado!
🚀 Servidor rodando na porta 3001
```

### Processamento de mensagem:
```
Message published to queue: [id]
Message received from queue: [id]
Processing message [id]: "mensagem"
AI response for [id]: "resposta"
```

---

## 🆘 Ainda com problemas?

1. **Reinicie tudo:**
   ```powershell
   # Parar tudo (Ctrl+C em cada terminal)
   
   # Reiniciar RabbitMQ
   docker restart rabbitmq
   
   # Backend
   cd backend
   npm run dev
   
   # Frontend
   cd ..
   npm run dev
   ```

2. **Verificar versões:**
   ```powershell
   node --version    # Deve ser v16+
   npm --version
   docker --version
   ```

3. **Limpar tudo e reinstalar:**
   ```powershell
   cd backend
   rm -rf node_modules
   npm install
   ```

---

## 📝 Checklist de Diagnóstico

- [ ] Node.js v16+ instalado
- [ ] RabbitMQ rodando (`docker ps`)
- [ ] Backend iniciado (porta 3001)
- [ ] Frontend iniciado (porta 5173)
- [ ] Arquivo `.env` existe no backend
- [ ] GROQ_API_KEY configurada
- [ ] Sem erros no console do navegador
- [ ] Sem erros no terminal do backend

---

## 🔄 Atualizar Modelo Groq

Se precisar mudar o modelo da IA:

1. Consulte modelos disponíveis:
   https://console.groq.com/docs/models

2. Edite `backend/config/groqModels.js`:
   ```javascript
   export const GROQ_MODELS = {
     DEFAULT: 'novo-modelo-aqui',
     // ...
   };
   ```

3. Reinicie o backend

---

## 📚 Recursos Úteis

- **Groq Docs**: https://console.groq.com/docs
- **RabbitMQ Tutorials**: https://www.rabbitmq.com/tutorials
- **Express Docs**: https://expressjs.com

---

**Dica:** Sempre verifique os logs do terminal do backend - eles mostram exatamente o que está acontecendo! 🔍
