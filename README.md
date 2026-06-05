# dev-burguer-api

API REST para gerenciamento de usuários, produtos, categorias e pedidos de um sistema de "burger". O projeto utiliza Express, Sequelize com PostgreSQL e Mongoose com MongoDB para armazenamento de pedidos.

## Tecnologias

- Node.js
- Express
- Sequelize
- PostgreSQL
- Mongoose
- MongoDB
- Multer
- JSON Web Tokens (JWT)
- Yup
- bcrypt

## Estrutura do projeto

- `src/app.js` - configuração principal do Express
- `src/routes.js` - definição das rotas da API
- `src/server.js` - ponto de entrada do servidor
- `src/database/index.js` - inicialização do Sequelize e conexão com MongoDB
- `src/config/database.cjs` - configuração do PostgreSQL
- `src/config/auth.js` - configuração do JWT
- `src/config/multer.cjs` - configuração de upload de arquivos
- `src/config/fileRoutes.cjs` - rotas para servir arquivos enviados
- `src/app/controllers` - controladores de usuários, sessões, produtos, categorias e pedidos
- `src/app/models` - modelos Sequelize para `User`, `Products` e `Category`
- `src/app/schemas` - schema Mongoose para `Order`
- `uploads/` - pasta de arquivos enviados

## Funcionalidades

- Registro de usuário
- Autenticação com JWT
- Controle de permissões administrativas
- CRUD parcial de produtos e categorias com upload de imagens
- Consulta de produtos e categorias
- Criação de pedidos no MongoDB
- Atualização de status de pedidos
- Listagem de pedidos para administradores

## Requisitos

- Node.js
- PostgreSQL
- MongoDB
- pnpm (recomendado, por causa do arquivo `pnpm-lock.yaml`)

## Configuração

A configuração de banco de dados PostgreSQL está em `src/config/database.cjs`:

- host: `localhost`
- port: `5432`
- username: `admin`
- password: `123456`
- database: `dev-burguer-db`

A conexão MongoDB está configurada em `src/database/index.js`:

- URI: `mongodb://localhost:27017/devburguer`

O JWT utiliza as configurações em `src/config/auth.js`:

- secret: `9e4a9fca2f4b77ae9a713e3a86e07f89`
- expiresIn: `7d`

> Atenção: as credenciais e segredos estão hardcoded no projeto. Para produção, mova essas configurações para variáveis de ambiente.

## Instalação

```bash
cd c:/Thays/documents/projects/dev-burguer-api
pnpm install
```

## Executar

```bash
pnpm dev
```

O servidor será iniciado em `http://localhost:3001`.

## Endpoints

### Autenticação

- `POST /users`
  - Cria um novo usuário.
  - Campos: `name`, `email`, `password`, `admin`

- `POST /sessions`
  - Realiza login e retorna token JWT.
  - Campos: `email`, `password`

### Produtos

> Todas as rotas abaixo exigem autenticação via header `Authorization: Bearer <token>`.

- `GET /products`
  - Lista todos os produtos.

- `POST /products`
  - Cria um produto (apenas administradores).
  - Campos: `name`, `price`, `category_id`, `offer`
  - Upload de arquivo para imagem em `file`

- `PUT /products/:id`
  - Atualiza um produto (apenas administradores).
  - Campos opcionais: `name`, `price`, `category_id`, `offer`
  - Upload de novo arquivo em `file`

- `GET /product-file/:filename`
  - Serve arquivos de imagens de produtos.

### Categorias

- `GET /categories`
  - Lista todas as categorias.

- `POST /categories`
  - Cria uma categoria (apenas administradores).
  - Campos: `name`
  - Upload de arquivo para imagem em `file`

- `PUT /categories/:id`
  - Atualiza uma categoria (apenas administradores).
  - Campos opcionais: `name`
  - Upload de novo arquivo em `file`

- `GET /category-file/:filename`
  - Serve arquivos de imagens de categoria.

### Pedidos

- `POST /orders`
  - Cria um pedido.
  - Campos: `products` (array de objetos `{ id, quantity }`)

- `PUT /orders/:id`
  - Atualiza status de pedido (apenas administradores).
  - Campos: `status`

- `GET /orders`
  - Lista todos os pedidos (apenas administradores).

## Observações importantes

- O projeto usa PostgreSQL para usuários, produtos e categorias.
- Os pedidos são armazenados em MongoDB usando Mongoose.
- Upload de arquivos é permitido para produtos e categorias, e os arquivos são servidos a partir de `uploads/`.
- A autenticação JWT é obrigatória para quase todas as rotas após `POST /sessions`.

## Melhorias sugeridas

- adicionar variáveis de ambiente para credenciais e JWT
- adicionar scripts de migração e seed automatizados
- adicionar tratamento de erros mais consistente
- validar se categoria existe antes de criar atualizações
- melhorar as mensagens de erro e status HTTP
