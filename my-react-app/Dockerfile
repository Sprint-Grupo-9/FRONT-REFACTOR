# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar código fonte e buildar
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remover arquivos padrão do nginx
RUN rm -rf ./*

# Copiar build do React
COPY --from=build /app/dist ./

# Copiar configuração customizada do nginx (se necessário)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
