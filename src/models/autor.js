/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/dbconfig.js';

class Autor {
  constructor({
    id,
    nome,
    nacionalidade,
    created_at,
    updated_at,
  }) {
    this.id = id || null;
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarAutores() {
    return db.select('*').from('autores');
  }

  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('autores').where({ id });
    return resultado[0];
  }

  async criar() {
    const novoAutor = {
      nome: this.nome,
      nacionalidade: this.nacionalidade,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
    return db('autores').insert(novoAutor);
  }

  async atualizar(id) {
    // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await db('autores')
      .where({ id })
      .update({ ...this, updated_at: new Date().toISOString() });

    return db.select('*').from('autores').where({ id });
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    return db('autores')
      .where({ id })
      .del();
  }

  async salvar() {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (this.id) {
      const resultado = await this.atualizar(this.id);
      return resultado;
    }
    const resultado = await this.criar();
    return resultado;
  }
}

export default Autor;
