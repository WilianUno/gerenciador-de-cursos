const professorService = require('../services/professorService');

class ProfessorController {
  async renderPage(req, res) {
    try {
      res.sendFile('professores.html', { root: './views/private' });
    } catch (error) {
      console.error('Erro ao renderizar página:', error);
      res.status(500).json({ error: 'Erro ao carregar página' });
    }
  }

  async getAll(req, res) {
    try {
      const result = await professorService.getAll();
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(500).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao listar professores:', error);
      res.status(500).json({ error: 'Erro ao listar professores' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await professorService.getById(id);
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(404).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao buscar professor:', error);
      res.status(500).json({ error: 'Erro ao buscar professor' });
    }
  }

  async create(req, res) {
    try {
      const result = await professorService.create(req.body);
      
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
      console.error('Erro ao criar professor:', error);
      res.status(500).json({ error: 'Erro ao criar professor' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await professorService.update(id, req.body);
      
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
      console.error('Erro ao atualizar professor:', error);
      res.status(500).json({ error: 'Erro ao atualizar professor' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await professorService.delete(id);
      
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
      console.error('Erro ao deletar professor:', error);
      res.status(500).json({ error: 'Erro ao deletar professor' });
    }
  }

  async getCursos(req, res) {
    try {
      const { id } = req.params;
      const result = await professorService.getCursos(id);
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(404).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao buscar cursos do professor:', error);
      res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
  }
}

module.exports = new ProfessorController();