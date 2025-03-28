const express = require('express');
const cors = require('cors');
const app = express();
const port = 3333;

// Middleware
app.use(cors());
app.use(express.json());

// Mock databases
const users = [
  {
    id: 1,
    nome: 'Admin',
    email: 'admin@example.com',
    password: '123456',
    telefone: '123456789'
  }
];

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    // Generate a simple token
    const token = {
      token: Buffer.from(user.email).toString('base64')
    };
    
    return res.json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      },
      token
    });
  }
  
  return res.status(401).json({ message: 'Credenciais inválidas' });
});

// Register route
app.post('/api/user', (req, res) => {
  const { nome, email, password, telefone } = req.body;
  
  // Check if user already exists
  const userExists = users.find(user => user.email === email);
  
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    nome,
    email,
    password,
    telefone
  };
  
  users.push(newUser);
  
  return res.status(201).json({
    id: newUser.id,
    nome: newUser.nome,
    email: newUser.email
  });
});

// Mock produtos database
const produtos = [
  {
    id: 1,
    nome: 'Produto Exemplo',
    descricao: 'Este é um produto de exemplo',
    preco: 29.99,
    quantidade: 50,
    categoria: 'Geral'
  }
];

// Rotas de produtos

// Listar todos os produtos
app.get('/api/produtos', (req, res) => {
  return res.json(produtos);
});

// Obter um produto específico
app.get('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  
  if (!produto) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  
  return res.json(produto);
});

// Adicionar um novo produto
app.post('/api/produtos', (req, res) => {
  const { nome, descricao, preco, quantidade, categoria } = req.body;
  
  if (!nome || !preco || quantidade === undefined) {
    return res.status(400).json({ message: 'Dados incompletos. Nome, preço e quantidade são obrigatórios.' });
  }
  
  const novoProduto = {
    id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
    nome,
    descricao,
    preco,
    quantidade,
    categoria
  };
  
  produtos.push(novoProduto);
  
  return res.status(201).json(novoProduto);
});

// Atualizar um produto
app.put('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  
  const { nome, descricao, preco, quantidade, categoria } = req.body;
  
  if (!nome || !preco || quantidade === undefined) {
    return res.status(400).json({ message: 'Dados incompletos. Nome, preço e quantidade são obrigatórios.' });
  }
  
  produtos[index] = {
    ...produtos[index],
    nome,
    descricao,
    preco,
    quantidade,
    categoria
  };
  
  return res.json(produtos[index]);
});

// Remover um produto
app.delete('/api/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  
  const produtoRemovido = produtos.splice(index, 1)[0];
  
  return res.json({ message: 'Produto removido com sucesso', produto: produtoRemovido });
});

// Atualizar estoque de um produto
app.patch('/api/produtos/:id/estoque', (req, res) => {
  const id = parseInt(req.params.id);
  const { quantidade, operacao } = req.body;
  
  if (quantidade === undefined || !operacao) {
    return res.status(400).json({ message: 'Dados incompletos. Quantidade e operação são obrigatórios.' });
  }
  
  const index = produtos.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  
  if (operacao === 'adicionar') {
    produtos[index].quantidade += parseInt(quantidade);
  } else if (operacao === 'remover') {
    if (produtos[index].quantidade < quantidade) {
      return res.status(400).json({ message: 'Quantidade insuficiente em estoque' });
    }
    produtos[index].quantidade -= parseInt(quantidade);
  } else {
    return res.status(400).json({ message: 'Operação inválida. Use "adicionar" ou "remover".' });
  }
  
  return res.json(produtos[index]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});