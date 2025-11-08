// src/middlewares/authMiddleware.js

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    
    // Se for API, retorna JSON
    if (req.originalUrl.includes('/api/')) {
        return res.status(401).json({ 
            error: 'Acesso negado. Você precisa estar autenticado.' 
        });
    }
    
    // Se for PÁGINA, redireciona
    res.redirect('/login');
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.tipo === 'admin') {
        return next();
    }
    return res.status(403).json({ 
        error: 'Acesso negado. Apenas administradores podem acessar esta área.' 
    });
};

const isProfessor = (req, res, next) => {
    if (req.session && req.session.user && 
        (req.session.user.tipo === 'professor' || req.session.user.tipo === 'admin')) {
        return next();
    }
    return res.status(403).json({ 
        error: 'Acesso negado. Apenas professores podem acessar esta área.' 
    });
};

const redirectIfAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect('/dashboard');
    }
    next();
};

// Este é o ÚNICO export deste arquivo
module.exports = {
    isAuthenticated,
    isAdmin,
    isProfessor,
    redirectIfAuthenticated
};