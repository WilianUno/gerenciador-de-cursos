// src/routes/alunoRoutes.js
const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { validateAluno, validateMatricula } = require('../middlewares/validationMiddleware');

router.use(isAuthenticated);

router.get('/', alunoController.renderPage);

router.get('/api', alunoController.getAll);

router.get('/api/:id', alunoController.getById);

router.post('/api', validateAluno, alunoController.create);

router.put('/api/:id', validateAluno, alunoController.update);

router.delete('/api/:id', alunoController.delete);

router.post('/api/matricular', validateMatricula, alunoController.matricularEmCurso);

router.post('/api/cancelar-matricula', validateMatricula, alunoController.cancelarMatricula);

router.get('/api/:id/cursos', alunoController.getCursos);

module.exports = router;