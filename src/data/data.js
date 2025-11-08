const { v4: uuidv4 } = require('uuid');

let usuarios = [
    {
        id: 'prof-uuid-1',
        nome: 'Prof. Ana Silva',
        email: 'ana@email.com',
        username: 'ana@email.com',
        senha: '123',
        tipo: 'professor'
    },
    {
        id: 'aluno-uuid-1',
        nome: 'Bruno Lima',
        email: 'bruno@email.com',
        username: 'bruno@email.com',
        senha: '123',
        tipo: 'aluno'
    }
];

let cursos = [
    {
        id: 'curso-uuid-1',
        titulo: 'Introdução ao Node.js',
        descricao: 'Aprenda o básico de Node.js, Express e EJS.',
        idProfessor: 'prof-uuid-1'
    }
];

let matriculas = [
    {
        idUsuario: 'aluno-uuid-1',
        idCurso: 'curso-uuid-1',
        dataInscricao: new Date()
    }
];

module.exports = {
    usuarios,
    cursos,
    matriculas
};