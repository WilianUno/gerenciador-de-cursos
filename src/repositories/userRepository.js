
const { usuarios } = require('../data');

class UserRepository {
    
    /**
     * Busca um usuário pelo email.
     * @param {string} email 
     * @returns {object | undefined} 
     */
    findByEmail(email) {
        console.log(`[Repository] Buscando usuário por email: ${email}`);
        return usuarios.find(u => u.email === email);
    }
    
}

module.exports = new UserRepository();