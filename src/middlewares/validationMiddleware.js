const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    const errors = [];
    
    if (!username || username.trim() === '') {
        errors.push('Username é obrigatório');
    }
    if (!password || password.trim() === '') {
        errors.push('Password é obrigatória');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

const validateProfessor = (req, res, next) => {
    const { nome, email, especialidade } = req.body;
    const errors = [];
    
    if (!nome || nome.trim() === '') {
        errors.push('Nome é obrigatório');
    }
    if (!email || email.trim() === '') {
        errors.push('Email é obrigatório');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email inválido');
    }
    if (!especialidade || especialidade.trim() === '') {
        errors.push('Especialidade é obrigatória');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

const validateCurso = (req, res, next) => {
    const { titulo, descricao } = req.body; 
    const errors = [];
    
    if (!titulo || titulo.trim() === '') { 
        errors.push('Título do curso é obrigatório');
    }
    
    if (!descricao || descricao.trim() === '') {
        errors.push('Descrição é obrigatória');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors: errors, message: errors.join(', ') });
    }
    
    next(); 
};

const validateAluno = (req, res, next) => {
    const { nome, email } = req.body;
    const errors = [];
    
    if (!nome || nome.trim() === '') {
        errors.push('Nome é obrigatório');
    }
    if (!email || email.trim() === '') {
        errors.push('Email é obrigatório');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

const validateMatricula = (req, res, next) => {
    const { alunoId, cursoId } = req.body;
    const errors = [];
    
    if (!alunoId || isNaN(alunoId)) {
        errors.push('Aluno é obrigatório');
    }
    if (!cursoId || isNaN(cursoId)) {
        errors.push('Curso é obrigatório');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

module.exports = {
    validateLogin,
    validateProfessor,
    validateCurso,
    validateAluno,
    validateMatricula
};