const professorRepository = require('../repositories/professorRepository');

class ProfessorService {
  async getAll() {
    try {
      const professores = professorRepository.findAll();
      return {
        success: true,
        data: professores
      };
    } catch (error) {
      console.error('Erro ao listar professores:', error);
      return {
        success: false,
        message: 'Erro ao listar professores'
      };
    }
  }
  
  async getById(id) {
    try {
      const professor = professorRepository.findById(id);
      
      if (!professor) {
        return {
          success: false,
          message: 'Professor não encontrado'
        };
      }
      
      return {
        success: true,
        data: professor
      };
    } catch (error) {
      console.error('Erro ao buscar professor:', error);
      return {
        success: false,
        message: 'Erro ao buscar professor'
      };
    }
  }
  
  async create(professorData) {
    try {
      const existingProfessor = professorRepository.findByEmail(professorData.email);
      if (existingProfessor) {
        return {
          success: false,
          message: 'Email já cadastrado'
        };
      }
      
      const newProfessor = professorRepository.create(professorData);
      
      return {
        success: true,
        message: 'Professor cadastrado com sucesso',
        data: newProfessor
      };
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar professor'
      };
    }
  }
  
  async update(id, professorData) {
    try {
      const professor = professorRepository.findById(id);
      
      if (!professor) {
        return {
          success: false,
          message: 'Professor não encontrado'
        };
      }
      
      if (professorData.email) {
        const existingProfessor = professorRepository.findByEmail(professorData.email);
        if (existingProfessor && existingProfessor.id !== parseInt(id)) {
          return {
            success: false,
            message: 'Email já está em uso por outro professor'
          };
        }
      }
      
      const updatedProfessor = professorRepository.update(id, professorData);
      
      return {
        success: true,
        message: 'Professor atualizado com sucesso',
        data: updatedProfessor
      };
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      return {
        success: false,
        message: 'Erro ao atualizar professor'
      };
    }
  }
  
  async delete(id) {
    try {
      const professor = professorRepository.findById(id);
      
      if (!professor) {
        return {
          success: false,
          message: 'Professor não encontrado'
        };
      }
      
      const cursos = professorRepository.getCursosByProfessor(id);
      if (cursos.length > 0) {
        return {
          success: false,
          message: 'Não é possível excluir professor que possui cursos cadastrados'
        };
      }
      
      professorRepository.delete(id);
      
      return {
        success: true,
        message: 'Professor excluído com sucesso'
      };
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
      return {
        success: false,
        message: 'Erro ao excluir professor'
      };
    }
  }
  
  async getCursos(professorId) {
    try {
      const professor = professorRepository.findById(professorId);
      
      if (!professor) {
        return {
          success: false,
          message: 'Professor não encontrado'
        };
      }
      
      const cursos = professorRepository.getCursosByProfessor(professorId);
      
      return {
        success: true,
        data: cursos
      };
    } catch (error) {
      console.error('Erro ao buscar cursos do professor:', error);
      return {
        success: false,
        message: 'Erro ao buscar cursos'
      };
    }
  }
}

module.exports = new ProfessorService();