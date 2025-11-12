const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Testes gerais da aplicação', () => {
  test('Deve retornar 200 na rota raiz', async () => {
    const res = await request.get('/api/'); // ✅ Adicione a barra
    expect(res.status).toBe(200);
    expect(res.text).toContain('API funcionando'); // ✅ Use .text ao invés de .body
  });

  test('Deve retornar 404 para rota inexistente', async () => {
    const res = await request.get('/api/rota-inexistente');
    expect(res.status).toBe(404);
  });
});
