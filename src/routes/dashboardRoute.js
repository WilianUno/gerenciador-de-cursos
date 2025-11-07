const express = require('express');
const router = express.Router();
const path = require('path');

const { isAuthenticated } = require('../middlewares/authMiddleware');
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/private/dashboard.html'));
});

module.exports = router;