// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');
const publicRoutes = require('./src/routes/publicRoutes');
const dashboardRoute = require('./src/routes/dashboardRoute');
const professorRoutes = require('./src/routes/professorRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes'); // AQUI
const alunoRoutes = require('./src/routes/alunoRoutes');
const { notFound, errorHandler, requestLogger } = require('./src/middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'gerenciador-cursos-unochapeco-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', publicRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoute);
app.use('/professores', professorRoutes);
app.use('/cursos', cursoRoutes); 
app.use('/alunos', alunoRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(` URL: http://localhost:${PORT}`);
});