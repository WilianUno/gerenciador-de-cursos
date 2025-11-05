const alunoService = require('../services/alunoService');

class AlunoController {
  async renderPage(req, res) {
    try {
      res.sendFile('alunos.html', { root: './views/private' });
    } catch (error) {
      console.error('Erro ao renderizar página:', error);
      res.status(500).json({ error: 'Erro ao carregar página' });
    }
  }

  async getAll(req, res) {
    try {
      const result = await alunoService.getAll();
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(500).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
      res.status(500).json({ error: 'Erro ao listar alunos' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await alunoService.getById(id);
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(404).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
  }

  async create(req, res) {
    try {
      const result = await alunoService.create(req.body);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          data: result.data
        });
      }
      
      return res.status(400).json({
        success: false,
        message: result.message
      });
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      res.status(500).json({ error: 'Erro ao criar aluno' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await alunoService.update(id, req.body);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data
        });
      }
      
      return res.status(400).json({
        success: false,
        message: result.message
      });
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await alunoService.delete(id);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message
        });
      }
      
      return res.status(400).json({
        success: false,
        message: result.message
      });
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
      res.status(500).json({ error: 'Erro ao deletar aluno' });
    }
  }

  async matricularEmCurso(req, res) {
    try {
      const { alunoId, cursoId } = req.body;
      const result = await alunoService.matricularEmCurso(alunoId, cursoId);
      
      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          data: result.data
        });
      }
      
      return res.status(400).json({
        success: false,
        message: result.message
      });
    } catch (error) {
      console.error('Erro ao matricular aluno:', error);
      res.status(500).json({ error: 'Erro ao matricular aluno' });
    }
  }

  async cancelarMatricula(req, res) {
    try {
      const { alunoId, cursoId } = req.body;
      const result = await alunoService.cancelarMatricula(alunoId, cursoId);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message
        });
      }
      
      return res.status(400).json({
        success: false,
        message: result.message
      });
    } catch (error) {
      console.error('Erro ao cancelar matrícula:', error);
      res.status(500).json({ error: 'Erro ao cancelar matrícula' });
    }
  }

  async getCursos(req, res) {
    try {
      const { id } = req.params;
      const result = await alunoService.getCursos(id);
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(404).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao buscar cursos do aluno:', error);
      res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
  }
}

module.exports = new AlunoController();