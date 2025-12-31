# Dashboard API

Bem-vindo ao repositório da API do projeto **Dashboard**. Esta aplicação backend foi construída utilizando **NestJS** e serve como núcleo para gerenciamento de usuários e autenticação.

## 🛠️ Tecnologias Utilizadas

O projeto utiliza uma stack moderna e robusta:

- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicações server-side eficientes e escaláveis.
- **[Prisma](https://www.prisma.io/)**: ORM moderno para Node.js e TypeScript.
- **[SQLite](https://www.sqlite.org/index.html)**: Banco de dados relacional leve e eficiente para desenvolvimento local.
- **[Passport](http://www.passportjs.org/)** & **[JWT](https://jwt.io/)**: Para autenticação segura e gerenciamento de sessões via tokens.
- **Jest**: Framework de testes para garantir a qualidade do código.

## 🚀 Funcionalidades Principais

- **Autenticação JWT**: Sistema completo de login e proteção de rotas.
- **Gerenciamento de Usuários**: CRUD de usuários com validação.
- **Banco de Dados Relacional**: Modelagem de dados com Prisma e SQLite.

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (Versão LTS recomendada)
- [npm](https://www.npmjs.com/) (Gerenciador de pacotes padrão do Node)

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/rafanvs/dashboard.git
```

2. Entre na pasta do projeto:

```bash
cd dashboard
```

3. Instale as dependências:

```bash
npm install
```

## 🔧 Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias (baseado no seu ambiente local):

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
```

2. Execute as migrações do banco de dados para criar as tabelas:

```bash
npx prisma migrate dev
```

## ▶️ Executando a Aplicação

```bash
# Desenvolvimento (com Watch mode)
npm run start:dev

# Produção
npm run start:prod
```

A API estará acessível em `http://localhost:8080` (ou na porta definida em `PORT`).

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e (End-to-End)
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📝 Licença

Este projeto está sob a licença [UNLICENSED](LICENSE).
