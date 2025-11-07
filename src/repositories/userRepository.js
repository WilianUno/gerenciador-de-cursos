// src/repositories/userRepository.js
const { usuarios } = require('../data/data.js'); 
const { v4: uuidv4 } = require('uuid');

class UserRepository {

    findByUsername(username) {
        console.log(`[Repository] Buscando usuário: ${username}`);
        return usuarios.find(u => u.email === username || u.username === username);
    }

    findById(id) {
        console.log(`[Repository] Buscando usuário por ID: ${id}`);
        return usuarios.find(u => u.id === id);
    }

    create(userData) {
        console.log(`[Repository] Criando novo usuário: ${userData.username}`);
        
        const newUser = {
            id: uuidv4(),
            nome: userData.nome,
            email: userData.username, 
            username: userData.username,
            password: userData.password,
            tipo: userData.tipo || 'aluno' 
        };

        usuarios.push(newUser);
        
        return newUser;
    }

    update(userId, updates) {
        console.log(`[Repository] Atualizando usuário ID: ${userId}`);
        
        const userIndex = usuarios.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return null;
        }

        usuarios[userIndex] = { ...usuarios[userIndex], ...updates };
        
        return usuarios[userIndex];
    }
}

module.exports = new UserRepository();