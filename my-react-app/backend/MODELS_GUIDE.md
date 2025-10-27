# 🤖 Guia de Modelos Groq - Escolha o Melhor para Seu Chatbot

## 📊 Modelos Disponíveis (Outubro 2025)

### ⭐ Recomendado para Chatbot
**Modelo:** `llama-3.3-70b-versatile`
- ✅ Balanço ideal entre velocidade e qualidade
- ✅ Ótimo para conversas naturais
- ✅ Compreensão de contexto excelente
- ⚡ Velocidade: Moderada
- 🧠 Qualidade: Alta
- **Status:** Ativo ✅

---

### ⚡ Mais Rápido
**Modelo:** `llama-3.1-8b-instant`
- ✅ Respostas muito rápidas
- ⚠️ Menor qualidade de resposta
- ⚡ Velocidade: Muito Alta
- 🧠 Qualidade: Média
- **Ideal para:** Respostas simples, FAQ
- **Status:** Ativo ✅

---

### 📝 Contexto Longo
**Modelo:** `mixtral-8x7b-32768`
- ✅ Suporta conversas muito longas
- ✅ Ótimo para histórico extenso
- ⚡ Velocidade: Moderada
- 🧠 Qualidade: Alta
- 💾 Contexto: 32.768 tokens
- **Ideal para:** Conversas complexas
- **Status:** Ativo ✅

---

### 🚫 Modelos Deprecados (NÃO USAR)

| Modelo | Status | Data Descontinuação |
|--------|--------|-------------------|
| `llama-3.1-70b-versatile` | ❌ Deprecado | Outubro 2025 |

---

## 🔄 Como Trocar de Modelo

### Opção 1: Editar Configuração (Recomendado)

Edite `backend/config/groqModels.js`:

```javascript
export const GROQ_MODELS = {
  DEFAULT: 'llama-3.3-70b-versatile', // ← Troque aqui
  // ...
};
```

Reinicie o backend:
```powershell
npm run dev
```

### Opção 2: Criar Configuração Personalizada

```javascript
// backend/config/groqModels.js
export const MODEL_CONFIGS = {
  chatbot: {
    model: 'llama-3.1-8b-instant', // ← Mais rápido
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1
  }
};
```

---

## ⚙️ Parâmetros de Configuração

### Temperature (0.0 - 1.0)
**O que é:** Controla a criatividade/aleatoriedade

- `0.3` → Respostas precisas e consistentes
- `0.7` → **Recomendado** - Balanço ideal
- `0.9` → Respostas criativas e variadas

**Para chatbot:** Use `0.7`

### Max Tokens
**O que é:** Tamanho máximo da resposta

- `512` → Respostas curtas
- `1024` → **Recomendado** - Padrão
- `2048` → Respostas longas

**Para chatbot:** Use `1024`

### Top P (0.0 - 1.0)
**O que é:** Controle de diversidade de vocabulário

- `0.8` → Vocabulário conservador
- `1.0` → **Recomendado** - Vocabulário completo

**Para chatbot:** Use `1.0`

---

## 📈 Comparação de Performance

| Modelo | Velocidade | Qualidade | Custo* | Contexto |
|--------|-----------|-----------|--------|----------|
| llama-3.3-70b-versatile | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Médio | 8K tokens |
| llama-3.1-8b-instant | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Baixo | 8K tokens |
| mixtral-8x7b-32768 | ⭐⭐⭐ | ⭐⭐⭐⭐ | Alto | 32K tokens |

*Custo em créditos da API Groq

---

## 🎯 Recomendações por Caso de Uso

### Chatbot de Atendimento (Atual)
```javascript
model: 'llama-3.3-70b-versatile',
temperature: 0.7,
max_tokens: 1024
```
✅ **Melhor opção!**

### FAQ Simples (Respostas Rápidas)
```javascript
model: 'llama-3.1-8b-instant',
temperature: 0.5,
max_tokens: 512
```

### Consultor Virtual (Respostas Detalhadas)
```javascript
model: 'mixtral-8x7b-32768',
temperature: 0.7,
max_tokens: 2048
```

### Suporte Técnico (Precisão)
```javascript
model: 'llama-3.3-70b-versatile',
temperature: 0.3,
max_tokens: 1024
```

---

## 🧪 Testar Diferentes Modelos

### 1. Crie configurações de teste

Edite `backend/config/groqModels.js`:

```javascript
export const MODEL_CONFIGS = {
  chatbot: {
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1
  },
  
  fast: {
    model: 'llama-3.1-8b-instant',
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1
  }
};
```

### 2. Altere no groqService.js

```javascript
const config = MODEL_CONFIGS.fast; // ou .chatbot
```

### 3. Teste e compare

```powershell
npm run test
```

---

## 📊 Métricas para Avaliar

Ao testar diferentes modelos, observe:

- ✅ **Qualidade das respostas** - Faz sentido? É útil?
- ⚡ **Velocidade** - Quanto tempo leva?
- 🎯 **Precisão** - Responde corretamente?
- 💬 **Naturalidade** - Parece humano?
- 🔄 **Consistência** - Mantém contexto?

---

## 🔍 Verificar Modelos Disponíveis

Para ver lista atualizada:

1. **Console Groq:**
   https://console.groq.com/docs/models

2. **API de Modelos:**
   ```javascript
   const models = await groq.models.list();
   console.log(models);
   ```

---

## 💡 Dicas de Otimização

### Para Economia de Créditos
- Use `llama-3.1-8b-instant` para perguntas simples
- Reduza `max_tokens` quando possível

### Para Melhor Qualidade
- Use `llama-3.3-70b-versatile`
- Aumente `temperature` para respostas mais naturais

### Para Conversas Longas
- Use `mixtral-8x7b-32768`
- Mantenha histórico completo

---

## 🆕 Atualizações Futuras

Se novos modelos forem lançados:

1. Verifique: https://console.groq.com/docs/models
2. Teste em ambiente de desenvolvimento
3. Atualize `backend/config/groqModels.js`
4. Documente mudanças

---

## 📞 Suporte

**Documentação Groq:**
- Modelos: https://console.groq.com/docs/models
- Parâmetros: https://console.groq.com/docs/text-chat
- Status: https://console.groq.com/docs/deprecations

---

**Configuração Atual:** `llama-3.3-70b-versatile` ✅

Testado e funcionando perfeitamente para o chatbot do PetShop! 🐾
