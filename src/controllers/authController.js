const authService = require('../services/authService');

class AuthController {
  async renderLogin(req, res) {
    try {
      res.sendFile('login.html', { root: './views/auth' });
    } catch (error) {
      console.error('Erro ao renderizar login:', error);
      res.status(500).json({ error: 'Erro ao carregar página de login' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      const result = await authService.login(username, password);
      
      if (result.success) {
        req.session.user = result.user;
        
        return res.status(200).json({
          success: true,
          message: result.message,
          user: result.user
        });
      }
      
      return res.status(401).json({
        success: false,
        message: result.message
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro ao processar login' });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error('Erro ao destruir sessão:', err);
          return res.status(500).json({ error: 'Erro ao fazer logout' });
        }
        
        res.status(200).json({
          success: true,
          message: 'Logout realizado com sucesso'
        });
      });
    } catch (error) {
      console.error('Erro no logout:', error);
      res.status(500).json({ error: 'Erro ao processar logout' });
    }
  }

  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          user: result.user
        });
      }
      
      return res.status(400).json({
        success: false,
        message: result.message
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async getCurrentUser(req, res) {
    try {
      if (req.session && req.session.user) {
        return res.status(200).json({
          success: true,
          user: req.session.user
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    } catch (error) {
      console.error('Erro ao obter usuário:', error);
      res.status(500).json({ error: 'Erro ao obter dados do usuário' });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.session.user.id;
      
      const result = await authService.changePassword(userId, oldPassword, newPassword);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message
        });
      }
      
      return res.status(400).json({
        success: false,
        message: result.message
      });
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      res.status(500).json({ error: 'Erro ao alterar senha' });
    }
  }
}

module.exports = new AuthController();