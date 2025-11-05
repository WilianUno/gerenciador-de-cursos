const cursoService = require('../services/cursoService');

class CursoController {
  async renderPage(req, res) {
    try {
      res.sendFile('cursos.html', { root: './views/private' });
    } catch (error) {
      console.error('Erro ao renderizar página:', error);
      res.status(500).json({ error: 'Erro ao carregar página' });
    }
  }

  async getAll(req, res) {
    try {
      const result = await cursoService.getAll();
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(500).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({ error: 'Erro ao listar cursos' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await cursoService.getById(id);
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(404).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao buscar curso:', error);
      res.status(500).json({ error: 'Erro ao buscar curso' });
    }
  }

  async create(req, res) {
    try {
      const result = await cursoService.create(req.body);
      
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
      console.error('Erro ao criar curso:', error);
      res.status(500).json({ error: 'Erro ao criar curso' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await cursoService.update(id, req.body);
      
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
      console.error('Erro ao atualizar curso:', error);
      res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await cursoService.delete(id);
      
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
      console.error('Erro ao deletar curso:', error);
      res.status(500).json({ error: 'Erro ao deletar curso' });
    }
  }

  async getAlunos(req, res) {
    try {
      const { id } = req.params;
      const result = await cursoService.getAlunos(id);
      
      if (result.success) {
        return res.status(200).json(result.data);
      }
      
      return res.status(404).json({ error: result.message });
    } catch (error) {
      console.error('Erro ao buscar alunos do curso:', error);
      res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
  }
}

module.exports = new CursoController();