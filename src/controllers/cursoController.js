const cursoService = require('../services/cursoService');
const path = require('path');

class CursoController {
    renderPage(req, res) {
        try {
            res.sendFile(path.join(__dirname, '../../views/private/cursos.html'));
        } catch (error) {
            res.status(500).send("Erro ao carregar a página de cursos.");
        }
    }

    getAll(req, res) {
        const resultado = cursoService.getAllCursos();
        if (resultado.success) {
            return res.status(200).json(resultado.data);
        }
        return res.status(500).json({ message: resultado.message });
    }

    create(req, res) {
        console.log('[Controller] Recebida requisição POST /api/cursos');
        
        const idDoProfessor = req.session.user.id;
        
        const resultado = cursoService.createCurso(req.body, idDoProfessor);
        
        if (resultado.success) {
            return res.status(201).json(resultado.data);
        }
        
        return res.status(500).json({ message: resultado.message });
    }

    getById(req, res) { res.json({ message: `getById (Curso ${req.params.id}) não implementado.` }); }
    update(req, res) { res.json({ message: `update (Curso ${req.params.id}) não implementado.` }); }
    delete(req, res) { res.json({ message: `delete (Curso ${req.params.id}) não implementado.` }); }
    getAlunos(req, res) { res.json({ message: `getAlunos (do Curso ${req.params.id}) não implementado.` }); }
}
module.exports = new CursoController();