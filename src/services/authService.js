const userRepository = require('../repositories/userRepository');

class AuthService {
  async login(username, password) {
    try {
      const user = userRepository.findByUsername(username);
      
      if (!user) {
        return {
          success: false,
          message: 'Usuário ou senha incorretos'
        };
      }
      
      if (user.password !== password) {
        return {
          success: false,
          message: 'Usuário ou senha incorretos'
        };
      }
      
      const { password: _, ...userWithoutPassword } = user;
      
      return {
        success: true,
        message: 'Login realizado com sucesso',
        user: userWithoutPassword
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        message: 'Erro ao realizar login'
      };
    }
  }
  
  async register(userData) {
    try {
      const existingUser = userRepository.findByUsername(userData.username);
      if (existingUser) {
        return {
          success: false,
          message: 'Username já está em uso'
        };
      }
      
      const newUser = userRepository.create({
        username: userData.username,
        password: userData.password,
        tipo: userData.tipo || 'professor',
        nome: userData.nome,
        professorId: userData.professorId || null
      });
      
      const { password: _, ...userWithoutPassword } = newUser;
      
      return {
        success: true,
        message: 'Usuário registrado com sucesso',
        user: userWithoutPassword
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        message: 'Erro ao registrar usuário'
      };
    }
  }
  
  validateSession(sessionUser) {
    if (!sessionUser || !sessionUser.id) {
      return false;
    }
    
    const user = userRepository.findById(sessionUser.id);
    return !!user;
  }
  
  async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = userRepository.findById(userId);
      
      if (!user) {
        return {
          success: false,
          message: 'Usuário não encontrado'
        };
      }
      
      if (user.password !== oldPassword) {
        return {
          success: false,
          message: 'Senha atual incorreta'
        };
      }
      
      userRepository.update(userId, { password: newPassword });
      
      return {
        success: true,
        message: 'Senha alterada com sucesso'
      };
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      return {
        success: false,
        message: 'Erro ao alterar senha'
      };
    }
  }
}

module.exports = new AuthService();