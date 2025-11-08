// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');

// --- 1. IMPORTAR ROTAS ---
const authRoutes = require('./src/routes/authRoutes');
const publicRoutes = require('./src/routes/publicRoutes');
const dashboardRoute = require('./src/routes/dashboardRoute');
const professorRoutes = require('./src/routes/professorRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const alunoRoutes = require('./src/routes/alunoRoutes');
const { notFound, errorHandler, requestLogger } = require('./src/middlewares/errorMiddleware');

// --- 2. INICIAR APP ---
const app = express();
const PORT = process.env.PORT || 3000;

// --- 3. MIDDLEWARES PRINCIPAIS (A ORDEM IMPORTA) ---
// (Estes DEVEM vir ANTES das rotas)

// A. Log de requests (do seu errorMiddleware)
app.use(requestLogger);

// B. Para o back-end ler JSON (do 'fetch')
app.use(express.json()); 

// C. Para o back-end ler formulários HTML
app.use(express.urlencoded({ extended: true }));

// D. Configuração da Sessão (DEVE vir antes das rotas)
app.use(session({
    secret: 'gerenciador-cursos-unochapeco-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
        httpOnly: true,
        secure: false 
    }
}));

// E. Servir arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, 'public')));

// --- 4. ROTAS DA APLICAÇÃO ---
// (O servidor só chega aqui depois de passar pelos middlewares acima)
app.use('/', publicRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoute);
app.use('/professores', professorRoutes);
app.use('/cursos', cursoRoutes);
app.use('/alunos', alunoRoutes);

// --- 5. MIDDLEWARES DE ERRO (DEVEM ser os ÚLTIMOS) ---
app.use(notFound);
app.use(errorHandler);

// --- 6. INICIAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`🚀 URL: http://localhost:${PORT}`);
});