// src/repositories/userRepository.js
const { usuarios } = require('../data/data.js'); 
const { v4: uuidv4 } = require('uuid');

class UserRepository {

    findByUsername(username) {
        return usuarios.find(u => u.email === username || u.username === username);
    }

    findById(id) {
        return usuarios.find(u => u.id === id);
    }

    create(userData) {
        const newUser = {
            id: uuidv4(),
            nome: userData.nome,
            email: userData.username, 
            username: userData.username,
            senha: userData.password, 
            tipo: userData.tipo || 'aluno' 
        };
        usuarios.push(newUser);
        return newUser;
    }

    update(userId, updates) {
        const userIndex = usuarios.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return null;
        }
        usuarios[userIndex] = { ...usuarios[userIndex], ...updates };
        return usuarios[userIndex];
    }
}

module.exports = new UserRepository();