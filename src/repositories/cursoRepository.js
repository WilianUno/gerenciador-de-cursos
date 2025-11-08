const { cursos, usuarios } = require('../data/data.js');
const { v4: uuidv4 } = require('uuid'); 

class CursoRepository {
    findAll() {
        return cursos.map(curso => {
            const professor = usuarios.find(u => u.id === curso.idProfessor);
            return {
                ...curso,
                nomeProfessor: professor ? professor.nome : 'Professor não encontrado'
            };
        });
    }

    create(dadosDoCurso, idDoProfessor) {
        const novoCurso = {
            id: uuidv4(), 
            titulo: dadosDoCurso.titulo,
            descricao: dadosDoCurso.descricao,
            idProfessor: idDoProfessor
        };
        
        cursos.push(novoCurso); 
        return novoCurso;
    }

    findById(id) { return cursos.find(c => c.id === id); }
    update(id, dados) { return dados; }
    delete(id) { return { id: id, deleted: true }; }
    findAlunos(cursoId) { return []; }
}
module.exports = new CursoRepository();