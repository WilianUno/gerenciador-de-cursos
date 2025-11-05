const alunoRepository = require('../repositories/alunoRepository');
const cursoRepository = require('../repositories/cursoRepository');

class AlunoService {
  async getAll() {
    try {
      const alunos = alunoRepository.findAll();
      
      const alunosComCursos = alunos.map(aluno => {
        const matriculas = alunoRepository.getMatriculasByAluno(aluno.id);
        return {
          ...aluno,
          totalCursos: matriculas.filter(m => m.status === 'ativo').length
        };
      });
      
      return {
        success: true,
        data: alunosComCursos
      };
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
      return {
        success: false,
        message: 'Erro ao listar alunos'
      };
    }
  }
  
  async getById(id) {
    try {
      const aluno = alunoRepository.findById(id);
      
      if (!aluno) {
        return {
          success: false,
          message: 'Aluno não encontrado'
        };
      }
      
      const cursos = alunoRepository.getCursosByAluno(id);
      
      return {
        success: true,
        data: {
          ...aluno,
          cursos: cursos
        }
      };
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      return {
        success: false,
        message: 'Erro ao buscar aluno'
      };
    }
  }
  
  async create(alunoData) {
    try {
      const existingAluno = alunoRepository.findByMatricula(alunoData.matricula);
      if (existingAluno) {
        return {
          success: false,
          message: 'Matrícula já cadastrada'
        };
      }
      
      const existingEmail = alunoRepository.findByEmail(alunoData.email);
      if (existingEmail) {
        return {
          success: false,
          message: 'Email já cadastrado'
        };
      }
      
      const newAluno = alunoRepository.create(alunoData);
      
      return {
        success: true,
        message: 'Aluno cadastrado com sucesso',
        data: newAluno
      };
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar aluno'
      };
    }
  }
  
  async update(id, alunoData) {
    try {
      const aluno = alunoRepository.findById(id);
      
      if (!aluno) {
        return {
          success: false,
          message: 'Aluno não encontrado'
        };
      }
      
      if (alunoData.matricula) {
        const existingAluno = alunoRepository.findByMatricula(alunoData.matricula);
        if (existingAluno && existingAluno.id !== parseInt(id)) {
          return {
            success: false,
            message: 'Matrícula já está em uso por outro aluno'
          };
        }
      }
      
      if (alunoData.email) {
        const existingEmail = alunoRepository.findByEmail(alunoData.email);
        if (existingEmail && existingEmail.id !== parseInt(id)) {
          return {
            success: false,
            message: 'Email já está em uso por outro aluno'
          };
        }
      }
      
      const updatedAluno = alunoRepository.update(id, alunoData);
      
      return {
        success: true,
        message: 'Aluno atualizado com sucesso',
        data: updatedAluno
      };
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      return {
        success: false,
        message: 'Erro ao atualizar aluno'
      };
    }
  }
  
  async delete(id) {
    try {
      const aluno = alunoRepository.findById(id);
      
      if (!aluno) {
        return {
          success: false,
          message: 'Aluno não encontrado'
        };
      }
      
      const matriculas = alunoRepository.getMatriculasByAluno(id);
      const matriculasAtivas = matriculas.filter(m => m.status === 'ativo');
      
      if (matriculasAtivas.length > 0) {
        return {
          success: false,
          message: 'Não é possível excluir aluno com matrículas ativas. Cancele as matrículas primeiro.'
        };
      }
      
      alunoRepository.delete(id);
      
      return {
        success: true,
        message: 'Aluno excluído com sucesso'
      };
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      return {
        success: false,
        message: 'Erro ao excluir aluno'
      };
    }
  }
  
  async matricularEmCurso(alunoId, cursoId) {
    try {
      const aluno = alunoRepository.findById(alunoId);
      if (!aluno) {
        return {
          success: false,
          message: 'Aluno não encontrado'
        };
      }
      
      const curso = cursoRepository.findById(cursoId);
      if (!curso) {
        return {
          success: false,
          message: 'Curso não encontrado'
        };
      }
      
      if (alunoRepository.isMatriculado(alunoId, cursoId)) {
        return {
          success: false,
          message: 'Aluno já está matriculado neste curso'
        };
      }
      
      if (!cursoRepository.temVagasDisponiveis(cursoId)) {
        return {
          success: false,
          message: 'Curso sem vagas disponíveis'
        };
      }
      
      const matricula = alunoRepository.createMatricula({
        alunoId: parseInt(alunoId),
        cursoId: parseInt(cursoId)
      });
      
      cursoRepository.incrementarVagas(cursoId);
      
      return {
        success: true,
        message: 'Aluno matriculado com sucesso',
        data: matricula
      };
    } catch (error) {
      console.error('Erro ao matricular aluno:', error);
      return {
        success: false,
        message: 'Erro ao matricular aluno'
      };
    }
  }
  
  async cancelarMatricula(alunoId, cursoId) {
    try {
      const aluno = alunoRepository.findById(alunoId);
      if (!aluno) {
        return {
          success: false,
          message: 'Aluno não encontrado'
        };
      }

      const curso = cursoRepository.findById(cursoId);
      if (!curso) {
        return {
          success: false,
          message: 'Curso não encontrado'
        };
      }
      
      if (!alunoRepository.isMatriculado(alunoId, cursoId)) {
        return {
          success: false,
          message: 'Aluno não está matriculado neste curso'
        };
      }
      
      const cancelled = alunoRepository.cancelarMatricula(alunoId, cursoId);
      
      if (cancelled) {
        cursoRepository.decrementarVagas(cursoId);
        
        return {
          success: true,
          message: 'Matrícula cancelada com sucesso'
        };
      }
      
      return {
        success: false,
        message: 'Erro ao cancelar matrícula'
      };
    } catch (error) {
      console.error('Erro ao cancelar matrícula:', error);
      return {
        success: false,
        message: 'Erro ao cancelar matrícula'
      };
    }
  }
  
  async getCursos(alunoId) {
    try {
      const aluno = alunoRepository.findById(alunoId);
      
      if (!aluno) {
        return {
          success: false,
          message: 'Aluno não encontrado'
        };
      }
      
      const cursos = alunoRepository.getCursosByAluno(alunoId);
      
      return {
        success: true,
        data: cursos
      };
    } catch (error) {
      console.error('Erro ao buscar cursos do aluno:', error);
      return {
        success: false,
        message: 'Erro ao buscar cursos'
      };
    }
  }
}

module.exports = new AlunoService();