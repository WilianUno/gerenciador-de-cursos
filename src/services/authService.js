// src/services/authService.js
const userRepository = require('../repositories/userRepository');

class AuthService {
    
    login(username, password) {
        try {
            const user = userRepository.findByUsername(username);
            
            if (!user) {
                return { success: false, message: 'Usuário ou senha incorretos' };
            }
            
            // --- CORREÇÃO AQUI ---
            // (Verificando user.senha, e não user.password)
            if (user.senha !== password) {
                return { success: false, message: 'Usuário ou senha incorretos' };
            }
            
            const { senha: _, ...userWithoutPassword } = user;
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
            
            const newUser = userRepository.create(userData);
            const { senha: _, ...userWithoutPassword } = newUser;
            
            return { success: true, message: 'Usuário registrado com sucesso', user: userWithoutPassword };
        } catch (error) {
            console.error('Erro no registro:', error);
            return { success: false, message: 'Erro ao registrar usuário' };
        }
    }

    changePassword(userId, oldPassword, newPassword) {
        try {
            const user = userRepository.findById(userId);
            
            if (!user) {
                return { success: false, message: 'Usuário não encontrado' };
            }
            
            // --- CORREÇÃO AQUI ---
            if (user.senha !== oldPassword) {
                return { success: false, message: 'Senha atual incorreta' };
            }
            
            userRepository.update(userId, { senha: newPassword });
            
            return { success: true, message: 'Senha alterada com sucesso' };
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            return { success: false, message: 'Erro ao alterar senha' };
        }
    }
}

module.exports = new AuthService();