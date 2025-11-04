const data = require('../data/data');

class UserRepository {
  findAll() {
    return data.users;
  }

  findById(id) {
    return data.users.find(user => user.id === parseInt(id));
  }

  findByUsername(username) {
    return data.users.find(user => user.username === username);
  }

  create(userData) {
    const newUser = {
      id: data.nextId.user++,
      ...userData
    };
    data.users.push(newUser);
    return newUser;
  }

  update(id, userData) {
    const index = data.users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return null;
    
    data.users[index] = {
      ...data.users[index],
      ...userData,
      id: data.users[index].id 
    };
    return data.users[index];
  }

  delete(id) {
    const index = data.users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return false;
    
    data.users.splice(index, 1);
    return true;
  }
}

module.exports = new UserRepository();