const authService = require('../services/authService');

class AuthController {
    
    async renderLogin(req, res) {
        try {
            res.sendFile('login.html', { root: './views/auth' }); 
        } catch (error) {
            res.status(500).json({ error: 'Erro ao carregar página de login' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = authService.login(username, password); 
            
            if (result.success) {
                req.session.user = result.user; 
                return res.status(200).json(result);
            }
            
            return res.status(401).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao processar login' });
        }
    }
    async logout(req, res) {
        try {
            const result = await authService.logout(req.session); 
            
            res.clearCookie('connect.sid'); 
            return res.status(200).json(result);

        } catch (error) {
            console.error('Erro no logout:', error);
            res.status(500).json({ error: error.message || 'Erro ao processar logout' });
        }
    }

    async register(req, res) {
        try {
            const result = authService.register(req.body); 
            
            if (result.success) {
                return res.status(201).json(result);
            }
            
            return res.status(400).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    }

    async getCurrentUser(req, res) {
        return res.status(200).json({
            success: true,
            user: req.session.user
        });
    }

    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            const userId = req.session.user.id; 
            
            const result = authService.changePassword(userId, oldPassword, newPassword);
            
            if (result.success) {
                return res.status(200).json(result);
            }
            
            return res.status(400).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao alterar senha' });
        }
    }
}

module.exports = new AuthController();