const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { isAuthenticated, isProfessor } = require('../middlewares/authMiddleware');
const { validateCurso } = require('../middlewares/validationMiddleware');

router.use(isAuthenticated);

router.get('/', cursoController.renderPage);

router.get('/api', cursoController.getAll);

router.get('/api/:id', cursoController.getById);

router.post('/api', isProfessor, validateCurso, cursoController.create);

router.put('/api/:id', isProfessor, validateCurso, cursoController.update);

router.delete('/api/:id', isProfessor, cursoController.delete);

router.get('/api/:id/alunos', cursoController.getAlunos);

module.exports = router;