const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const { validateProfessor } = require('../middlewares/validationMiddleware');

router.use(isAuthenticated);

router.get('/', professorController.renderPage);

router.get('/api', professorController.getAll);

router.get('/api/:id', professorController.getById);

router.post('/api', isAdmin, validateProfessor, professorController.create);

router.put('/api/:id', isAdmin, validateProfessor, professorController.update);

router.delete('/api/:id', isAdmin, professorController.delete);

router.get('/api/:id/cursos', professorController.getCursos);

module.exports = router;