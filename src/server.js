
const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000; 

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'seu-segredo-super-secreto-aqui',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
});