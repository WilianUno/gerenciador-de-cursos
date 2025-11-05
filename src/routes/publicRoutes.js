const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile('home.html', { root: './views/public' });
});

router.get('/sobre', (req, res) => {
  res.sendFile('sobre.html', { root: './views/public' });
});

router.get('/contato', (req, res) => {
  res.sendFile('contato.html', { root: './views/public' });
});

router.post('/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  
  console.log('Contato recebido:', { nome, email, mensagem });
  
  res.status(200).json({
    success: true,
    message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
  });
});

module.exports = router;