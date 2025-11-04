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
  const { nome, email, especialidade, telefone } = req.body;
  
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
  
  if (telefone && !/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(telefone)) {
    errors.push('Telefone inválido. Use o formato: (99) 99999-9999');
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
  
  if (!cargaHoraria || isNaN(cargaHoraria) || cargaHoraria <= 0) {
    errors.push('Carga horária deve ser um número positivo');
  }
  
  if (!vagas || isNaN(vagas) || vagas <= 0) {
    errors.push('Número de vagas deve ser um número positivo');
  }
  
  if (!periodo || periodo.trim() === '') {
    errors.push('Período é obrigatório');
  }
  
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
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email inválido');
  }
  
  if (!matricula || matricula.trim() === '') {
    errors.push('Matrícula é obrigatória');
  }
  
  if (!curso || curso.trim() === '') {
    errors.push('Curso é obrigatório');
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