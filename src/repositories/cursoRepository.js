const { cursos, usuarios } = require('../data/data.js');

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
    findById(id) { return cursos.find(c => c.id === id); }
    create(dados) { return dados; }
    update(id, dados) { return dados; }
    delete(id) { return { id: id, deleted: true }; }
    findAlunos(cursoId) { return []; }
}
module.exports = new CursoRepository();