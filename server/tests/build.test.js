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

describe('## Build APIs', () => {
  let build = {
    name: 'My build',
    image: '55c787ddd62fc26cdc1a5e91',
    desc: 'My build description',
    category: 'trains',
    createdBy: '58b915d72b18236b0c775ee0',
    updatedBy: '58b915d72b18236b0c775ee0',
    ownedBy: '58b915d72b18236b0c775ee0'
  };

  describe('# POST /api/builds', () => {
    it('should create a new build', (done) => {
      request(app)
        .post('/api/builds')
        .send(build)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(build.name);
          expect(res.body.image).to.equal(build.image);
          expect(res.body.desc).to.equal(build.desc);
          expect(res.body.category).to.equal(build.category);
          expect(res.body.createdBy).to.equal(build.createdBy);
          expect(res.body.updatedBy).to.equal(build.updatedBy);
          expect(res.body.ownedBy).to.equal(build.ownedBy);
          build = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/builds/:buildId', () => {
    it('should get build details', (done) => {
      request(app)
        .get(`/api/builds/${build._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(build.name);
          expect(res.body.image).to.equal(build.image);
          expect(res.body.desc).to.equal(build.desc);
          expect(res.body.category).to.equal(build.category);
          expect(res.body.createdBy).to.equal(build.createdBy);
          expect(res.body.updatedBy).to.equal(build.updatedBy);
          expect(res.body.ownedBy).to.equal(build.ownedBy);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when build does not exists', (done) => {
      request(app)
        .get('/api/builds/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/builds/:buildId', () => {
    it('should update build details', (done) => {
      build.name = 'My new build name';
      build.desc = 'My new build description';
      request(app)
        .put(`/api/builds/${build._id}`)
        .send(build)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('My new build name');
          expect(res.body.image).to.equal(build.image);
          expect(res.body.desc).to.equal('My new build description');
          expect(res.body.category).to.equal(build.category);
          expect(res.body.createdBy).to.equal(build.createdBy);
          expect(res.body.updatedBy).to.equal(build.updatedBy);
          expect(res.body.ownedBy).to.equal(build.ownedBy);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/builds/', () => {
    it('should get all builds', (done) => {
      request(app)
        .get('/api/builds')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all builds (with limit and skip)', (done) => {
      request(app)
        .get('/api/builds')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/builds/', () => {
    it('should delete build', (done) => {
      request(app)
        .delete(`/api/builds/${build._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('My new build name');
          expect(res.body.image).to.equal(build.image);
          expect(res.body.desc).to.equal('My new build description');
          expect(res.body.category).to.equal(build.category);
          expect(res.body.createdBy).to.equal(build.createdBy);
          expect(res.body.updatedBy).to.equal(build.updatedBy);
          expect(res.body.ownedBy).to.equal(build.ownedBy);
          done();
        })
        .catch(done);
    });
  });
});
