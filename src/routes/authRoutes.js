const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require('../middlewares/validationMiddleware');
const { redirectIfAuthenticated } = require('../middlewares/authMiddleware');

router.get('/login', redirectIfAuthenticated, authController.renderLogin);

router.post('/login', validateLogin, authController.login);

router.get('/logout', authController.logout);
router.post('/logout', authController.logout);

router.post('/register', authController.register);

router.get('/current-user', authController.getCurrentUser);

router.post('/change-password', authController.changePassword);

module.exports = router;