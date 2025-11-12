const supertest = require('supertest');
const app = require('../src/app.js');
const request = supertest(app);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const url = '/api/animais';
let id = null;

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Teste do recurso /animais', () => {
  describe('POST', () => {
    test('POST /deve retornar 201 ao cadastrar', async () => {
      const response = await request.post(url).send({
        nome: "Rex",
        especie: "Cachorro",
        idade: 4,
        porte: 'Médio'
      });
      expect(response.status).toBe(201);
      expect(response.body.animal).toBeDefined();
      expect(response.body.animal.nome).toBe("Rex");
      expect(response.body.animal.porte).toBe("Médio");
      id = response.body.animal._id;
    });

    test('POST /deve retornar 400 se obrigatório faltar', async () => {
      const response = await request.post(url).send({
        nome: "",
        especie: "",
        idade: "a"
      });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET', () => {
    test('GET /deve retornar 200 e lista', async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /id deve retornar animal', async () => {
      const response = await request.get(`${url}/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.nome).toBe("Rex");
    });

    test('GET /id inexistente deve retornar 404', async () => {
      const response = await request.get(`${url}/000000000000000000000000`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Animal não encontrado.");
    });
  });

  describe('PUT', () => {
    test('PUT /id deve atualizar e retornar 200', async () => {
      const response = await request.put(`${url}/${id}`).send({
        nome: "Max",
        especie: "Cachorro",
        idade: 6,
        porte: "Grande",
        status_adocao: "Adotado"
      });
      expect(response.status).toBe(200);
      expect(response.body.animal.nome).toBe("Max");
      expect(response.body.animal.status_adocao).toBe("Adotado");
    });

    test('PUT /id inexistente deve retornar 404', async () => {
      const response = await request.put(`${url}/000000000000000000000000`).send({
        nome: "Fake"
      });
      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Animal não encontrado");
    });
  });

  describe('PATCH', () => {
    test('PATCH /id deve alterar parcialmente', async () => {
      const response = await request.patch(`${url}/${id}`).send({ porte: "Pequeno" });
      expect(response.status).toBe(200);
      expect(response.body.animal.porte).toBe("Pequeno");
    });

    test('PATCH /id inexistente deve retornar 404', async () => {
      const response = await request.patch(`${url}/000000000000000000000000`).send({
        porte: "Médio"
      });
      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Animal não encontrado");
    });
  });

  describe('DELETE', () => {
    test('DELETE /id deve retornar 200', async () => {
      const response = await request.delete(`${url}/${id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Animal removido com sucesso!");
    });

    test('DELETE /id inexistente deve retornar 404', async () => {
      const response = await request.delete(`${url}/000000000000000000000000`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Animal não encontrado para exclusão.");
    });
  });
});
