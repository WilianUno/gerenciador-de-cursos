const express = require('express');
const router = express.Router();
const path = require('path');
const cursoController = require('../controllers/cursoController');
const { isAuthenticated, isProfessor } = require('../middlewares/authMiddleware');
const { validateCurso } = require('../middlewares/validationMiddleware');

router.get('/', isAuthenticated, cursoController.renderPage);

router.get('/api', isAuthenticated, cursoController.getAll);

router.get('/api/:id', isAuthenticated, cursoController.getById);
router.post('/api', isAuthenticated, isProfessor, validateCurso, cursoController.create);
router.put('/api/:id', isAuthenticated, isProfessor, validateCurso, cursoController.update);
router.delete('/api/:id', isAuthenticated, isProfessor, cursoController.delete);
router.get('/api/:id/alunos', isAuthenticated, cursoController.getAlunos);

module.exports = router;