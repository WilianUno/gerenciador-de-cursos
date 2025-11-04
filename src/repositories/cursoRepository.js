const data = require('../data/data');

class CursoRepository {
  findAll() {
    return data.cursos;
  }

  findById(id) {
    return data.cursos.find(curso => curso.id === parseInt(id));
  }

  create(cursoData) {
    const newCurso = {
      id: data.nextId.curso++,
      vagasOcupadas: 0,
      ...cursoData
    };
    data.cursos.push(newCurso);
    return newCurso;
  }

  update(id, cursoData) {
    const index = data.cursos.findIndex(curso => curso.id === parseInt(id));
    if (index === -1) return null;
    
    data.cursos[index] = {
      ...data.cursos[index],
      ...cursoData,
      id: data.cursos[index].id
    };
    return data.cursos[index];
  }

  delete(id) {
    const index = data.cursos.findIndex(curso => curso.id === parseInt(id));
    if (index === -1) return false;
    
    data.cursos.splice(index, 1);
    return true;
  }

  incrementarVagas(id) {
    const curso = this.findById(id);
    if (curso) {
      curso.vagasOcupadas++;
      return curso;
    }
    return null;
  }

  decrementarVagas(id) {
    const curso = this.findById(id);
    if (curso && curso.vagasOcupadas > 0) {
      curso.vagasOcupadas--;
      return curso;
    }
    return null;
  }

  temVagasDisponiveis(id) {
    const curso = this.findById(id);
    return curso && curso.vagasOcupadas < curso.vagas;
  }
}

module.exports = new CursoRepository();