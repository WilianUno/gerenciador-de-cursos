const data = require('../data/data');

class AlunoRepository {
  findAll() {
    return data.alunos;
  }

  findById(id) {
    return data.alunos.find(aluno => aluno.id === parseInt(id));
  }

  findByMatricula(matricula) {
    return data.alunos.find(aluno => aluno.matricula === matricula);
  }

  findByEmail(email) {
    return data.alunos.find(aluno => aluno.email === email);
  }

  create(alunoData) {
    const newAluno = {
      id: data.nextId.aluno++,
      ...alunoData
    };
    data.alunos.push(newAluno);
    return newAluno;
  }

  update(id, alunoData) {
    const index = data.alunos.findIndex(aluno => aluno.id === parseInt(id));
    if (index === -1) return null;
    
    data.alunos[index] = {
      ...data.alunos[index],
      ...alunoData,
      id: data.alunos[index].id
    };
    return data.alunos[index];
  }

  delete(id) {
    const index = data.alunos.findIndex(aluno => aluno.id === parseInt(id));
    if (index === -1) return false;
    
    data.alunos.splice(index, 1);
    return true;
  }

  getMatriculasByAluno(alunoId) {
    return data.matriculas.filter(mat => mat.alunoId === parseInt(alunoId));
  }

  getCursosByAluno(alunoId) {
    const matriculas = this.getMatriculasByAluno(alunoId);
    const cursosIds = matriculas.map(mat => mat.cursoId);
    return data.cursos.filter(curso => cursosIds.includes(curso.id));
  }

  createMatricula(matriculaData) {
    const newMatricula = {
      id: data.nextId.matricula++,
      dataMatricula: new Date().toISOString().split('T')[0],
      status: 'ativo',
      ...matriculaData
    };
    data.matriculas.push(newMatricula);
    return newMatricula;
  }

  isMatriculado(alunoId, cursoId) {
    return data.matriculas.some(
      mat => mat.alunoId === parseInt(alunoId) && 
             mat.cursoId === parseInt(cursoId) &&
             mat.status === 'ativo'
    );
  }

  cancelarMatricula(alunoId, cursoId) {
    const matricula = data.matriculas.find(
      mat => mat.alunoId === parseInt(alunoId) && 
             mat.cursoId === parseInt(cursoId) &&
             mat.status === 'ativo'
    );
    
    if (matricula) {
      matricula.status = 'cancelado';
      return true;
    }
    return false;
  }

  getAlunosByCurso(cursoId) {
    const matriculas = data.matriculas.filter(
      mat => mat.cursoId === parseInt(cursoId) && mat.status === 'ativo'
    );
    const alunosIds = matriculas.map(mat => mat.alunoId);
    return data.alunos.filter(aluno => alunosIds.includes(aluno.id));
  }
}

module.exports = new AlunoRepository();