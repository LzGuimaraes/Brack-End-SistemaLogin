# Sistema de Login - Backend

## Descrição
Este é o servidor backend para o Sistema de Login, fornecendo APIs para autenticação de usuários e gerenciamento de produtos.

## Estrutura do Projeto
```
backend/
├── server.js        # Servidor Express com APIs
├── package.json     # Dependências e scripts
└── README.md        # Documentação
```

## Funcionalidades
- Autenticação de usuários (login/cadastro)
- CRUD de produtos
- Gerenciamento de estoque

## Como Utilizar

1. Instale as dependências:
   ```
   npm install
   ```

2. Inicie o servidor:
   ```
   npm run dev
   ```

3. O servidor será iniciado na porta 3333: http://localhost:3333

## APIs Disponíveis

### Usuários
- `POST /api/login` - Login de usuário
- `POST /api/user` - Cadastro de usuário

### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `GET /api/produtos/:id` - Obter um produto específico
- `POST /api/produtos` - Adicionar um novo produto
- `PUT /api/produtos/:id` - Atualizar um produto
- `DELETE /api/produtos/:id` - Remover um produto
- `PATCH /api/produtos/:id/estoque` - Atualizar estoque de um produto