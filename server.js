const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');
const publicRoutes = require('./src/routes/publicRoutes');
const dashboardRoute = require('./src/routes/dashboardRoute');
const professorRoutes = require('./src/routes/professorRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const alunoRoutes = require('./src/routes/alunoRoutes');

const { notFound, errorHandler, requestLogger } = require('./src/middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use(session({
  secret: 'gerenciador-cursos-unochapeco-2024', // Em produção, use variável de ambiente
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24 horas
    httpOnly: true,
    secure: false // Em produção com HTTPS, mude para true
  }
}));

app.use('/', publicRoutes);

app.use('/', authRoutes);

app.use('/', dashboardRoute);

app.use('/professores', professorRoutes);
app.use('/cursos', cursoRoutes);
app.use('/alunos', alunoRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`URL: http://localhost:${PORT}`);
});  console.log(`📍 URL: http://localhost:${PORT}`);


module.exports = app;