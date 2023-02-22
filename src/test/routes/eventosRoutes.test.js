import { after } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../app.js';
import db from '../../db/dbconfig.js';
import EventosController from '../../controllers/eventosController.js';

chai.use(chaiHttp);
const { expect } = chai;
let stub;

after(async () => {
  await db.destroy();
});

describe('GET em /eventos', () => {
  it('Deve retornar uma lista de eventos', (done) => {
    stub = sinon.stub(EventosController, 'liberaAcessoEventos').returns(true);
    chai.request(app)
      .get('/eventos')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        expect(res.body[0]).to.have.property('descricao');
        done();
      });
  });
  it('Deve retornar erro 404', (done) => {
    stub.restore();
    stub = sinon.stub(EventosController, 'liberaAcessoEventos').returns(false);
    chai.request(app)
      .get('/eventos')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
