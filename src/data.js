// src/data.js

const { v4: uuidv4 } = require('uuid');

// Vamos usar 'let' porque esses arrays serão modificados (novos usuários, cursos, etc.)
let usuarios = [
    {
        id: uuidv4(),
        nome: 'Prof. Ana Silva',
        email: 'ana@email.com',
        // Em um projeto real, a senha NUNCA seria salva assim. Usaríamos hash (bcrypt).
        // Para este trabalho, manteremos simples.
        senha: '123',
        tipo: 'professor' // 'professor' ou 'aluno'
    },
    {
        id: uuidv4(),
        nome: 'Bruno Lima',
        email: 'bruno@email.com',
        senha: '123',
        tipo: 'aluno'
    }
];

let cursos = [
    {
        id: uuidv4(),
        titulo: 'Introdução ao Node.js',
        descricao: 'Aprenda o básico de Node.js, Express e EJS.',
        // Relacionamento: ID do professor que criou o curso
        idProfessor: usuarios[0].id // 'Prof. Ana Silva'
    }
];

let matriculas = [
    {
        // Relacionamento: ID do aluno e ID do curso
        idUsuario: usuarios[1].id, // 'Bruno Lima'
        idCurso: cursos[0].id,
        dataInscricao: new Date()
    }
];

// Exportamos os arrays para que possam ser usados nos repositórios
module.exports = {
    usuarios,
    cursos,
    matriculas
};