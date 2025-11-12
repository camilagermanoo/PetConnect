const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const url = '/api/auth';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Teste do recurso /auth', () => {
  describe('POST /register', () => {
    test('Deve registrar novo usuário', async () => {
      const res = await request.post(`${url}/register`).send({
        email: "usuario@email.com",
        password: "senhaforte"
      });
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Usuário registrado com sucesso!');
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe('usuario@email.com');
    });

    test('Não deve registrar sem email', async () => {
      const res = await request.post(`${url}/register`).send({
        password: "senhaforte"
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email e senha são obrigatórios');
    });

    test('Não deve registrar sem senha', async () => {
      const res = await request.post(`${url}/register`).send({
        email: "usuario2@email.com"
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email e senha são obrigatórios');
    });

    test('Não deve registrar email duplicado', async () => {
      // Primeiro registro
      await request.post(`${url}/register`).send({
        email: "duplicado@email.com",
        password: "senha123"
      });

      // Tenta registrar com mesmo email
      const res = await request.post(`${url}/register`).send({
        email: "duplicado@email.com",
        password: "outra_senha"
      });
      expect(res.status).toBe(409);
      expect(res.body.message).toBe('Email já cadastrado');
    });
  });

  describe('POST /login', () => {
    beforeAll(async () => {
      // Cria usuário para testes de login
      await request.post(`${url}/register`).send({
        email: "login@email.com",
        password: "login123"
      });
    });

    test('Deve fazer login com credenciais válidas', async () => {
      const res = await request.post(`${url}/login`).send({
        email: "login@email.com",
        password: "login123"
      });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login realizado com sucesso!');
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe('login@email.com');
    });

    test('Não deve logar sem email', async () => {
      const res = await request.post(`${url}/login`).send({
        password: "login123"
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email e senha são obrigatórios');
    });

    test('Não deve logar sem senha', async () => {
      const res = await request.post(`${url}/login`).send({
        email: "login@email.com"
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email e senha são obrigatórios');
    });

    test('Não deve logar com senha errada', async () => {
      const res = await request.post(`${url}/login`).send({
        email: "login@email.com",
        password: "senha_errada"
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Email ou senha inválidos');
    });

    test('Não deve logar usuário não cadastrado', async () => {
      const res = await request.post(`${url}/login`).send({
        email: "naoexiste@email.com",
        password: "qualquer_senha"
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Email ou senha inválidos');
    });
  });
});
