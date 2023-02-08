import Autor from '../models/autor.js';

class AutoresController {
  static listarAutores = async (_, res) => {
    try {
      const resultado = await Autor.pegarAutores();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarAutorPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Autor.pegarPeloId(params.id);
      if (!resultado) {
        return res.status(404).json({ message: `id ${params.id} não encontrado` });
      }
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarAutor = async (req, res) => {
    const { body } = req;
    const autor = new Autor(body);
    try {
      if (Object.keys(body).length === 0) {
        throw new Error('corpo da requisição vazio');
      }
      await autor.salvar(autor);
      return res.status(201).json({ message: 'autor criado' });
    } catch (err) {
      if (err.message === 'corpo da requisição vazio') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json(err.message);
    }
  };

  static atualizarAutor = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const autorAtual = await Autor.pegarPeloId(params.id);
      if (!autorAtual) {
        return res.status(404).json({ message: `id ${params.id} não encontrado` });
      }
      const novoAutor = new Autor({ ...autorAtual, ...body });
      const resposta = await novoAutor.salvar(novoAutor);
      return res.status(200).json({ message: 'autor atualizado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static excluirAutor = async (req, res) => {
    const { params } = req;
    try {
      const autorFoiDeletado = await Autor.excluir(params.id);
      if (!autorFoiDeletado) {
        return res.status(404).json({ message: `Autor com id ${params.id} não encontrado` });
      }
      return res.status(200).json({ message: 'autor excluído' });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
}

export default AutoresController;
