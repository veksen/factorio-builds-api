import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Blueprint APIs', () => {
  let blueprint = {
    name: 'My blueprint',
    order: 0,
    desc: 'My blueprint description',
    hash: '0af2af34d',
    build: '58a8efa30be5f1893609b0bd',
  };

  describe('# POST /api/blueprints', () => {
    it('should create a new blueprint', (done) => {
      request(app)
        .post('/api/blueprints')
        .send(blueprint)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(blueprint.name);
          expect(res.body.order).to.equal(blueprint.order);
          expect(res.body.desc).to.equal(blueprint.desc);
          expect(res.body.hash).to.equal(blueprint.hash);
          expect(res.body.build).to.equal(blueprint.build);
          blueprint = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/blueprints/:blueprintId', () => {
    it('should get blueprint details', (done) => {
      request(app)
        .get(`/api/blueprints/${blueprint._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(blueprint.name);
          expect(res.body.order).to.equal(blueprint.order);
          expect(res.body.desc).to.equal(blueprint.desc);
          expect(res.body.hash).to.equal(blueprint.hash);
          expect(res.body.build).to.equal(blueprint.build);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when blueprint does not exists', (done) => {
      request(app)
        .get('/api/blueprints/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/blueprints/:blueprintId', () => {
    it('should update blueprint details', (done) => {
      blueprint.name = 'My new blueprint name';
      blueprint.desc = 'My new blueprint description';
      request(app)
        .put(`/api/blueprints/${blueprint._id}`)
        .send(blueprint)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('My new blueprint name');
          expect(res.body.order).to.equal(blueprint.order);
          expect(res.body.desc).to.equal('My new blueprint description');
          expect(res.body.hash).to.equal(blueprint.hash);
          expect(res.body.build).to.equal(blueprint.build);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/blueprints/', () => {
    it('should get all blueprints', (done) => {
      request(app)
        .get('/api/blueprints')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all blueprints (with limit and skip)', (done) => {
      request(app)
        .get('/api/blueprints')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/blueprints/', () => {
    it('should delete blueprint', (done) => {
      request(app)
        .delete(`/api/blueprints/${blueprint._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('My new blueprint name');
          expect(res.body.order).to.equal(blueprint.order);
          expect(res.body.desc).to.equal('My new blueprint description');
          expect(res.body.hash).to.equal(blueprint.hash);
          expect(res.body.build).to.equal(blueprint.build);
          done();
        })
        .catch(done);
    });
  });
});
