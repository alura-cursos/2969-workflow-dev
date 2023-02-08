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

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', (done) => {
    chai.request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        expect(res.body[0]).to.have.property('cidade');
        expect(res.body[0]).to.have.property('email');
        done();
      });
  });

  it('Deve retornar uma editora', (done) => {
    const idEditora = 1;
    chai.request(app)
      .get(`/editoras/${idEditora}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('nome');
        expect(res.body).to.have.property('cidade');
        expect(res.body).to.have.property('email');
        done();
      });
  });

  it('Não deve retornar uma editora com id inválido', (done) => {
    const idEditora = 'A';
    chai.request(app)
      .get(`/editoras/${idEditora}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message')
          .eql(`id ${idEditora} não encontrado`);
        done();
      });
  });
});

describe('POST em /editoras', () => {
  it('Deve criar uma nova editora', (done) => {
    const editora = {
      nome: 'Editora Teste',
      cidade: 'Testelândia',
      email: 'e@e.com',
    };
    chai.request(app)
      .post('/editoras')
      .set('Accept', 'application/json')
      .send(editora)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.content).to.include({
          nome: editora.nome,
          cidade: editora.cidade,
        });
        done();
      });
  });

  it('Não deve criar uma editora ao receber body vazio', (done) => {
    const editora = {};
    chai.request(app)
      .post('/editoras')
      .set('Accept', 'application/json')
      .send(editora)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message')
          .eql('corpo da requisição vazio');
        done();
      });
  });
});

describe('PUT em /editoras', () => {
  it('Deve atualizar uma editora', (done) => {
    const idEditora = 2;
    const editoraAtualizada = {
      nome: 'Editora Testada Dois',
      cidade: 'Tangamandápio',
    };
    chai.request(app)
      .put(`/editoras/${idEditora}`)
      .set('Accept', 'application/json')
      .send(editoraAtualizada)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.content[0]).to.include({
          nome: editoraAtualizada.nome,
          cidade: editoraAtualizada.cidade,
        });
        done();
      });
  });

  it('Não deve atualizar uma editora com id inválido', (done) => {
    const idEditora = 'A';
    const autorAtualizado = {
      name: 'Atualizando Novamente',
    };
    chai.request(app)
      .put(`/editoras/${idEditora}`)
      .set('Accept', 'application/json')
      .send(autorAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message')
          .eql(`id ${idEditora} não encontrado`);
        done();
      });
  });
});

describe('DELETE em /editoras', () => {
  it('Deve deletar uma editora', (done) => {
    const idEditora = 1;
    chai.request(app)
      .delete(`/editoras/${idEditora}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message')
          .eql('editora excluída');
        done();
      });
  });

  it('Não deve deletar uma editora com id inválido', (done) => {
    const idEditora = 'A';
    chai.request(app)
      .delete(`/editoras/${idEditora}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message')
          .eql(`Editora com id ${idEditora} não encontrada`);
        done();
      });
  });
});
