const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.sendFile('dashboard.html', { root: './views/private' });
});

module.exports = router;