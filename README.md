# API de Vídeos

Esta é uma API para gerenciar vídeos e imagens, permitindo que os usuários façam o upload de vídeos e imagens, criem contas e autentiquem-se com JWT (JSON Web Token). A API é construída com **TypeScript**, **Express**, **Prisma ORM** para gerenciamento de banco de dados, **bcrypt** para hashing de senhas e **multer** para upload de arquivos.

## Tecnologias Usadas

- **Node.js / Express**: Framework para construção da API.
- **TypeScript**: Linguagem para garantir tipos estáticos e maior robustez ao código.
- **Prisma ORM**: ORM para interagir com o banco de dados de maneira eficiente e com segurança.
- **bcrypt**: Biblioteca para encriptação de senhas de maneira segura.
- **jsonwebtoken (JWT)**: Para autenticação de usuários com tokens JWT.
- **multer**: Middleware para o upload de arquivos (vídeos e imagens).
- **express-async-errors**: Para tratar erros assíncronos de forma simples.

## Funcionalidades

- **Autenticação de usuários**: Cadastro e login de usuários com autenticação JWT.
- **Upload de vídeos e imagens**: Permite que os usuários façam o upload de vídeos e imagens.
- **Gerenciamento de vídeos**: Criação, leitura, atualização e exclusão de vídeos.
- **Armazenamento de mídia**: Os vídeos e imagens são armazenados no servidor e o caminho para o arquivo é salvo no banco de dados.

## Pré-requisitos

- **Node.js** (recomenda-se a versão 14 ou superior)
- **npm** ou **yarn** para gerenciar pacotes.
- **Banco de dados** configurado (ex: PostgreSQL, MySQL). O Prisma ORM se conecta ao banco de dados para interagir com ele.

## Instalação

### 1. Clone este repositório

```bash
git clone https://github.com/seu-usuario/video-api.git
cd video-api
```

## Instale as dependências

```bash
npm install
or
yarn install
```

## Configuração do banco de dados

Exemplo de arquivo .env

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```

## Rodando o Prisma para gerar o cliente

```bash
npx prisma migrate dev --name init
```

## Inicie a aplicação

```bash
npm run dev
```

## Estrutura do Projeto

├── src/
│ ├── controllers/ # Funções para cada rota (ex: criação de usuários, upload de vídeos)
│ ├── middleware/ # Middlewares (ex: autenticação com JWT, upload com multer)
│ ├── lib/ # Configuração do prisma client e multer.
│ ├── services/ # Lógica de negócio (ex: criação de tokens, manipulação de arquivos)
│ ├── utils/ # Funções auxiliares (ex: validações)
│ ├── routes.ts # Definições de rotas (ex: `users`, `videos`)
│ └── server.ts # Arquivo principal de configuração do servidor Express
├── prisma/ # Configurações do Prisma e migrations
├── tmp/ # Pasta onde os vídeos e imagens serão salvos
├── .env # Arquivo com variáveis de ambiente (nunca comitar com dados reais)
├── .gitignore # Ignora arquivos/diretórios do Git (como a pasta uploads)
├── package.json # Dependências e scripts do projeto
└── README.md # Este arquivo

## Contribuindo

# 1. Clone o repositório do GitHub

git clone https://github.com/loopsdesenvolvedor/api_caligulas.git
cd api_caligulas

# 2. Crie uma nova branch

git checkout -b nome-da-sua-branch

# 3. Faça as alterações no código

## Licença

Este projeto está licenciado sob a MIT License.
