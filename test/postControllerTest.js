/* global it, describe */
const express = require('express');
const request = require('supertest');
const postController = require('../controllers/postController');
const sinon = require('sinon');
const postService = require('../services/postService');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('../public'));

app.use('', postController);
const server = app.listen(3000);


describe('postController', () => {
  describe('GET /', () => {
    it('should respond with homepage', (done) => {
      const stub = sinon.stub(postService, 'getAllPosts').resolves('expected');
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /posts', () => {
    it('should respond with homepage', (done) => {
      const stub = sinon.stub(postService, 'getAllPosts').resolves('expected');
      request(app)
        .get('/posts')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /posts/:post_id', () => {
    it('should respond with post detail', (done) => {
      const stub = sinon.stub(postService, 'getOnePost').resolves('expected');
      request(app)
        .get('/posts/post_id')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/My First Blog/)
        .end((err) => {
          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /post_new', () => {
    it('should respond with new post page', (done) => {
      const stub = sinon.stub(postService, 'createNewPost');
      request(app)
        .get('/post_new')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(/New Post/)
        .end((err) => {
          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('POST /post_new', () => {
    it('should respond with all posts page after creating a new post', (done) => {
      const stub = sinon.stub(postService, 'createNewPost').resolves('expected');
      request(app)
        .post('/post_new')
        .send({ title: 'title', author: 'author', body: 'body' })
        .expect(302)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('Location', 'posts')
        .end((err) => {
          stub.restore();
          if (err) return done(err);
          return done();
        });
    });
  });
});

server.close();