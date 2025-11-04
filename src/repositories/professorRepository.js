const data = require('../data/data');

class ProfessorRepository {
  findAll() {
    return data.professores;
  }

  findById(id) {
    return data.professores.find(prof => prof.id === parseInt(id));
  }

  findByEmail(email) {
    return data.professores.find(prof => prof.email === email);
  }

  create(professorData) {
    const newProfessor = {
      id: data.nextId.professor++,
      ...professorData
    };
    data.professores.push(newProfessor);
    return newProfessor;
  }

  update(id, professorData) {
    const index = data.professores.findIndex(prof => prof.id === parseInt(id));
    if (index === -1) return null;
    
    data.professores[index] = {
      ...data.professores[index],
      ...professorData,
      id: data.professores[index].id
    };
    return data.professores[index];
  }

  delete(id) {
    const index = data.professores.findIndex(prof => prof.id === parseInt(id));
    if (index === -1) return false;
    
    data.professores.splice(index, 1);
    return true;
  }

  getCursosByProfessor(professorId) {
    return data.cursos.filter(curso => curso.professorId === parseInt(professorId));
  }
}

module.exports = new ProfessorRepository();