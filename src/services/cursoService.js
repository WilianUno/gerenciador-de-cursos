const cursoRepository = require('../repositories/cursoRepository');
const professorRepository = require('../repositories/professorRepository');
const alunoRepository = require('../repositories/alunoRepository');

class CursoService {
  async getAll() {
    try {
      const cursos = cursoRepository.findAll();
      
      const cursosComProfessor = cursos.map(curso => {
        const professor = professorRepository.findById(curso.professorId);
        return {
          ...curso,
          professor: professor ? professor.nome : 'Não atribuído',
          vagasDisponiveis: curso.vagas - curso.vagasOcupadas
        };
      });
      
      return {
        success: true,
        data: cursosComProfessor
      };
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      return {
        success: false,
        message: 'Erro ao listar cursos'
      };
    }
  }
  
  async getById(id) {
    try {
      const curso = cursoRepository.findById(id);
      
      if (!curso) {
        return {
          success: false,
          message: 'Curso não encontrado'
        };
      }
      
      const professor = professorRepository.findById(curso.professorId);
      const alunos = alunoRepository.getAlunosByCurso(id);
      
      return {
        success: true,
        data: {
          ...curso,
          professor: professor ? professor.nome : 'Não atribuído',
          vagasDisponiveis: curso.vagas - curso.vagasOcupadas,
          alunos: alunos
        }
      };
    } catch (error) {
      console.error('Erro ao buscar curso:', error);
      return {
        success: false,
        message: 'Erro ao buscar curso'
      };
    }
  }
  
  async create(cursoData) {
    try {
      const professor = professorRepository.findById(cursoData.professorId);
      if (!professor) {
        return {
          success: false,
          message: 'Professor não encontrado'
        };
      }
      
      const newCurso = cursoRepository.create({
        ...cursoData,
        professorId: parseInt(cursoData.professorId),
        cargaHoraria: parseInt(cursoData.cargaHoraria),
        vagas: parseInt(cursoData.vagas)
      });
      
      return {
        success: true,
        message: 'Curso cadastrado com sucesso',
        data: newCurso
      };
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar curso'
      };
    }
  }
  
  async update(id, cursoData) {
    try {
      const curso = cursoRepository.findById(id);
      
      if (!curso) {
        return {
          success: false,
          message: 'Curso não encontrado'
        };
      }
      
      if (cursoData.professorId) {
        const professor = professorRepository.findById(cursoData.professorId);
        if (!professor) {
          return {
            success: false,
            message: 'Professor não encontrado'
          };
        }
      }
      
      if (cursoData.vagas && parseInt(cursoData.vagas) < curso.vagasOcupadas) {
        return {
          success: false,
          message: `Não é possível reduzir vagas. Existem ${curso.vagasOcupadas} alunos matriculados`
        };
      }
      
      const updatedCurso = cursoRepository.update(id, cursoData);
      
      return {
        success: true,
        message: 'Curso atualizado com sucesso',
        data: updatedCurso
      };
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      return {
        success: false,
        message: 'Erro ao atualizar curso'
      };
    }
  }
  
  async delete(id) {
    try {
      const curso = cursoRepository.findById(id);
      
      if (!curso) {
        return {
          success: false,
          message: 'Curso não encontrado'
        };
      }
      
      const alunos = alunoRepository.getAlunosByCurso(id);
      if (alunos.length > 0) {
        return {
          success: false,
          message: 'Não é possível excluir curso com alunos matriculados'
        };
      }
      
      cursoRepository.delete(id);
      
      return {
        success: true,
        message: 'Curso excluído com sucesso'
      };
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      return {
        success: false,
        message: 'Erro ao excluir curso'
      };
    }
  }
  
  async getAlunos(cursoId) {
    try {
      const curso = cursoRepository.findById(cursoId);
      
      if (!curso) {
        return {
          success: false,
          message: 'Curso não encontrado'
        };
      }
      
      const alunos = alunoRepository.getAlunosByCurso(cursoId);
      
      return {
        success: true,
        data: alunos
      };
    } catch (error) {
      console.error('Erro ao buscar alunos do curso:', error);
      return {
        success: false,
        message: 'Erro ao buscar alunos'
      };
    }
  }
}

module.exports = new CursoService();