const userRepository = require('../repositories/userRepository');

class AuthService {
    login(username, password) {
        try {
            const user = userRepository.findByUsername(username); 
            
            if (!user) {
                return { success: false, message: 'Usuário ou senha incorretos' };
            }
            
            if (user.password !== password) {
                return { success: false, message: 'Usuário ou senha incorretos' };
            }
            
            const { password: _, ...userWithoutPassword } = user;
            return { success: true, user: userWithoutPassword };

        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, message: 'Erro ao realizar login' };
        }
    }
    logout(session) {
        return new Promise((resolve, reject) => {
            session.destroy((err) => {
                if (err) {
                    console.error('Erro ao destruir sessão:', err);
                    return reject(new Error('Erro ao fazer logout'));
                }
                resolve({ success: true, message: 'Logout realizado com sucesso' });
            });
        });
    }

    register(userData) {
        try {
            const existingUser = userRepository.findByUsername(userData.username);
            if (existingUser) {
                return { success: false, message: 'Username já está em uso' };
            }
            return { success: true, user: { username: userData.username, tipo: 'professor' } };
        } catch (error) {
            console.error('Erro no registro:', error);
            return { success: false, message: 'Erro ao registrar usuário' };
        }
    }

    validateSession(sessionUser) {
    }

    changePassword(userId, oldPassword, newPassword) {
    }
}

module.exports = new AuthService();