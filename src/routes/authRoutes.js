const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require('../middlewares/validationMiddleware');
const { redirectIfAuthenticated, isAuthenticated } = require('../middlewares/authMiddleware');
router.get('/login', redirectIfAuthenticated, authController.renderLogin);
router.post('/login', validateLogin, authController.login);
router.post('/register', authController.register);
router.post('/logout', isAuthenticated, authController.logout);
router.get('/current-user', isAuthenticated, authController.getCurrentUser);
router.post('/change-password', isAuthenticated, authController.changePassword);

module.exports = router;