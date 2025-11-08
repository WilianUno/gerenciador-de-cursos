const cursoRepository = require('../repositories/cursoRepository');

class CursoService {
    getAllCursos() {
        try {
            const dados = cursoRepository.findAll();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
            return { success: false, message: 'Erro ao buscar cursos.' };
        }
    }
    getCursoById(id) { return cursoRepository.findById(id); }
    createCurso(dados) { return cursoRepository.create(dados); }
    updateCurso(id, dados) { return cursoRepository.update(id, dados); }
    deleteCurso(id) { return cursoRepository.delete(id); }
    getAlunosDoCurso(id) { return cursoRepository.findAlunos(id); }
}
module.exports = new CursoService();