// src/server.js

const express = require('express');
const session = require('express-session');
const path = require('path');

// Inicializa o Express
const app = express();
const PORT = 3000; // Define a porta em que o servidor rodará

// --- Configuração de Middlewares Essenciais ---

// 1. Middleware para "ler" JSON do corpo das requisições (req.body)
// Essencial para o JavaScript do front-end enviar dados (ex: fetch)
app.use(express.json());

// 2. Middleware para "ler" dados de formulários HTML tradicionais
app.use(express.urlencoded({ extended: true }));

// 3. Configuração do Express Session (para login)
app.use(session({
    secret: 'seu-segredo-super-secreto-aqui', // Troque por uma string aleatória
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true, // Em produção (com HTTPS), defina como true
        httpOnly: true, // Impede acesso ao cookie via JS no front-end
        maxAge: 1000 * 60 * 60 // Tempo da sessão (ex: 1 hora)
    }
}));

// 4. Middleware para servir arquivos estáticos (HTML, CSS, JS do front-end)
// Tudo que estiver na pasta 'public' será acessível pela raiz do site
// Ex: seu-projeto/src/public/login.html -> acessível em http://localhost:3000/login.html
app.use(express.static(path.join(__dirname, 'public')));

// --- Rotas ---
// (Aqui vamos importar e usar nossas rotas mais tarde)
// Ex: const authRoutes = require('./routes/authRoutes');
// Ex: app.use('/auth', authRoutes);

// Rota de teste inicial
app.get('/api/teste', (req, res) => {
    res.json({ message: 'Servidor está funcionando!' });
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
});