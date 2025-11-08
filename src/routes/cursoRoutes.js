const express = require('express');
const router = express.Router();
const path = require('path');
const cursoController = require('../controllers/cursoController');
const { isAuthenticated, isProfessor } = require('../middlewares/authMiddleware');
const { validateCurso } = require('../middlewares/validationMiddleware');

// ROTA DA PÁGINA (GET /cursos)
// 1. Verifica se está logado
// 2. Chama o controller para ENVIAR O ARQUIVO HTML
router.get('/', isAuthenticated, cursoController.renderPage);

// --- ROTAS DA API (usadas pelo JavaScript) ---

// ROTA DA API (GET /api/cursos)
router.get('/api', isAuthenticated, cursoController.getAll);

// (O resto das suas rotas de API)
router.get('/api/:id', isAuthenticated, cursoController.getById);
router.post('/api', isAuthenticated, isProfessor, validateCurso, cursoController.create);
router.put('/api/:id', isAuthenticated, isProfessor, validateCurso, cursoController.update);
router.delete('/api/:id', isAuthenticated, isProfessor, cursoController.delete);
router.get('/api/:id/alunos', isAuthenticated, cursoController.getAlunos);

module.exports = router;