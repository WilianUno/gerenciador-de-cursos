// src/middlewares/validationMiddleware.js

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
    const { nome, email, especialidade } = req.body; // Removi telefone
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
    const { nome, descricao, professorId, cargaHoraria, vagas, periodo } = req.body;
    const errors = [];
    
    if (!nome || nome.trim() === '') {
        errors.push('Nome do curso é obrigatório');
    }
    if (!descricao || descricao.trim() === '') {
        errors.push('Descrição é obrigatória');
    }
    if (!professorId || isNaN(professorId)) {
        errors.push('Professor é obrigatório');
    }
    // (Adicione mais validações conforme precisar)
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};

const validateAluno = (req, res, next) => {
    const { nome, email, matricula, curso } = req.body;
    const errors = [];
    
    if (!nome || nome.trim() === '') {
        errors.push('Nome é obrigatório');
    }
    if (!email || email.trim() === '') {
        errors.push('Email é obrigatório');
    }
    // (Adicione mais validações)

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

// Este é o ÚNICO export deste arquivo
module.exports = {
    validateLogin,
    validateProfessor,
    validateCurso,
    validateAluno,
    validateMatricula
};