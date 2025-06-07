# Columbia Petshop - Sistema de Agendamento para Pets

Este é um sistema web desenvolvido em React para gerenciamento de agendamentos de serviços para pets, como banho, tosa e outros cuidados.

## 🚀 Tecnologias Utilizadas

- React.js
- Node.js
- Tailwind CSS
- React Router DOM
- React Icons
- React Hot Toast
- Axios

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- Node.js (versão 14.x ou superior)
- npm (gerenciador de pacotes do Node.js)
- Git

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO](https://github.com/Sprint-Grupo-9/FRONT-REFACTOR.git)
```

2. Entre na pasta do projeto:
```bash
cd my-react-app
```

3. Instale as dependências:
```bash
npm install
```

## 📦 Dependências do Projeto

O projeto utiliza as seguintes dependências principais:

```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^4.12.0",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
}
```

## 🚀 Como Executar

1. Inicie o servidor de desenvolvimento:
```bash
npm start
```

2. O projeto estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
my-react-app/
├── public/
├── src/
│   ├── components/
│   │   ├── contents/
│   │   ├── shared/
│   │   ├── site/
│   │   └── system/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── App.js
├── package.json
└── README.md
```

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
REACT_APP_API_URL=sua_url_da_api
```

## 🛠️ Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm test`: Executa os testes
- `npm run build`: Cria a versão de produção
- `npm run eject`: Ejecta o projeto (irreversível)

## 📝 Funcionalidades Principais

- Cadastro e login de usuários
- Gerenciamento de pets
- Agendamento de serviços
- Visualização de histórico de agendamentos
- Perfil do usuário
- Dashboard administrativo

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- Equipe de desenvolvimento
- Contribuidores
- Comunidade open source
