// Modelos Groq disponíveis (atualizado em Out 2025)
// Consulte: https://console.groq.com/docs/models para lista atualizada

export const GROQ_MODELS = {
  // Modelo recomendado para chatbot (balanço entre velocidade e qualidade)
  DEFAULT: 'llama-3.3-70b-versatile',
  
  // Modelos alternativos
  FAST: 'llama-3.1-8b-instant',           // Mais rápido, menor qualidade
  BALANCED: 'llama-3.3-70b-versatile',    // Balanço ideal
  QUALITY: 'mixtral-8x7b-32768',          // Contexto maior
  
  // Lista de modelos deprecados (não usar)
  DEPRECATED: [
    'llama-3.1-70b-versatile',  // Descontinuado em Out 2025
  ]
};

// Configurações padrão para cada tipo de uso
export const MODEL_CONFIGS = {
  chatbot: {
    model: GROQ_MODELS.DEFAULT,
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1
  },
  
  creative: {
    model: GROQ_MODELS.BALANCED,
    temperature: 0.9,
    max_tokens: 2048,
    top_p: 1
  },
  
  precise: {
    model: GROQ_MODELS.BALANCED,
    temperature: 0.3,
    max_tokens: 512,
    top_p: 0.9
  }
};

export default GROQ_MODELS;
