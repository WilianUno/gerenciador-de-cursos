// src/controllers/alunoController.js

const path = require('path');
class AlunoController {

    renderPage(req, res) {
        res.sendFile(path.join(__dirname, '../../views/private/alunos.html'));
    }
    getAll(req, res) {
        res.json({ message: 'Método getAll (Alunos) ainda não implementado.' });
    }

    getById(req, res) {
        const { id } = req.params;
        res.json({ message: `Método getById (Aluno ${id}) ainda não implementado.` });
    }

    create(req, res) {
        const dados = req.body;
        res.status(201).json({ message: 'Método create (Aluno) ainda não implementado.', data: dados });
    }

    update(req, res) {
        const { id } = req.params;
        const dados = req.body;
        res.json({ message: `Método update (Aluno ${id}) ainda não implementado.`, data: dados });
    }

    delete(req, res) {
        const { id } = req.params;
        res.json({ message: `Método delete (Aluno ${id}) ainda não implementado.` });
    }

    matricularEmCurso(req, res) {
        const dados = req.body;
        res.json({ message: 'Método matricularEmCurso ainda não implementado.', data: dados });
    }

    cancelarMatricula(req, res) {
        const dados = req.body;
        res.json({ message: 'Método cancelarMatricula ainda não implementado.', data: dados });
    }

    getCursos(req, res) {
        const { id } = req.params;
        res.json({ message: `Método getCursos (do Aluno ${id}) ainda não implementado.` });
    }
}

module.exports = new AlunoController();