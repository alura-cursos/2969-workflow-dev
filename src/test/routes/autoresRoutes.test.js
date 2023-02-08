/* eslint-disable no-unused-expressions */
import { after } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import db from '../../db/dbconfig.js';

chai.use(chaiHttp);
const { expect } = chai;

after(async () => {
  await db.destroy();
});

describe('GET em /autores', () => {
  it('Deve retornar uma lista de autores', (done) => {
    chai.request(app)
      .get('/autores')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        expect(res.body[0]).to.have.property('nacionalidade');
        done();
      });
  });

  it('Deve retornar um autor', (done) => {
    const idAutor = 1;
    chai.request(app)
      .get(`/autores/${idAutor}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('nome');
        expect(res.body).to.have.property('nacionalidade');
        done();
      });
  });

  it('Não deve retornar um autor com id inválido', (done) => {
    const idAutor = 'A';
    chai.request(app)
      .get(`/autores/${idAutor}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message')
          .eql(`id ${idAutor} não encontrado`);
        done();
      });
  });
});

describe('POST em /autores', () => {
  it('Deve criar um novo autor', (done) => {
    const autor = {
      nome: 'Teste Testinho',
      nacionalidade: 'Testelândia',
    };
    chai.request(app)
      .post('/autores')
      .set('Accept', 'application/json')
      .send(autor)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message')
          .eql('autor criado');
        done();
      });
  });

  it('Não deve criar um autor ao receber body vazio', (done) => {
    const autor = {};
    chai.request(app)
      .post('/autores')
      .set('Accept', 'application/json')
      .send(autor)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message')
          .eql('corpo da requisição vazio');
        done();
      });
  });
});

describe('PUT em /autores', () => {
  it('Deve atualizar um autor', (done) => {
    const idAutor = 2;
    const autorAtualizado = {
      nome: 'Outro Nome',
      nacionalidade: 'Tangamandápio',
    };
    chai.request(app)
      .put(`/autores/${idAutor}`)
      .set('Accept', 'application/json')
      .send(autorAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.content[0]).to.include({
          nome: autorAtualizado.nome,
          nacionalidade: autorAtualizado.nacionalidade,
        });
        done();
      });
  });

  it('Não deve atualizar um autor com id inválido', (done) => {
    const idAutor = 'A';
    const autorAtualizado = {
      name: 'Atualizando Novamente',
    };
    chai.request(app)
      .put(`/autores/${idAutor}`)
      .set('Accept', 'application/json')
      .send(autorAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message')
          .eql(`id ${idAutor} não encontrado`);
        done();
      });
  });
});

describe('DELETE em /autores', () => {
  it('Deve deletar um autor', (done) => {
    const idAutor = 4;
    chai.request(app)
      .delete(`/autores/${idAutor}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message')
          .eql('autor excluído');
        done();
      });
  });

  it('Não deve deletar um autor com id inválido', (done) => {
    const idAutor = 'A';
    chai.request(app)
      .delete(`/autores/${idAutor}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message')
          .eql(`Autor com id ${idAutor} não encontrado`);
        done();
      });
  });
});
