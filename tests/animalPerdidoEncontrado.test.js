const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const url = '/api/animais-perdidos';

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

describe('Teste do recurso /animais-perdidos', () => {
  describe('POST', () => {
    test('POST /deve retornar 201 ao cadastrar', async () => {
      const response = await request.post(url).send({
        nome: "Tom",
        especie: "Gato",
        idade: 3,
        porte: 'Pequeno',
        status: "Perdido",
        descricao: "Gato laranja com coleira vermelha", // ✅ Obrigatório
        contato: "11 9 9999-9999", // ✅ Obrigatório
        local: "Rua Central"
      });
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Animal perdido/encontrado cadastrado com sucesso!");
      expect(response.body.animal).toBeDefined();
      expect(response.body.animal.nome).toBe("Tom");
      id = response.body.animal._id;
    });

    test('POST /deve retornar 400 se obrigatório faltar', async () => {
      const response = await request.post(url).send({
        especie: "Gato"
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Erro ao cadastrar animal");
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
      expect(response.body.nome).toBe("Tom");
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
        nome: "Tommy",
        especie: "Gato",
        idade: 4,
        porte: "Pequeno",
        status: "Encontrado",
        descricao: "Gato laranja com coleira vermelha - encontrado", // ✅ Mantém obrigatório
        contato: "11 9 8888-8888", // ✅ Mantém obrigatório
        local: "Avenida Principal"
      });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Dados do animal atualizados!");
      expect(response.body.animal.nome).toBe("Tommy");
    });

    test('PUT /id inexistente deve retornar 404', async () => {
      const response = await request.put(`${url}/000000000000000000000000`).send({
        nome: "Fake",
        especie: "Cachorro",
        idade: 2,
        porte: "Médio",
        status: "Perdido",
        descricao: "Fake",
        contato: "11 9 0000-0000",
        local: "Local Fake"
      });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Animal não encontrado para atualização.");
    });
  });

  describe('PATCH', () => {
    test('PATCH /id deve alterar parcialmente', async () => {
      const response = await request.patch(`${url}/${id}`).send({ 
        porte: "Médio"
      });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Animal atualizado com sucesso!");
      expect(response.body.animal.porte).toBe("Médio");
    });

    test('PATCH /id inexistente deve retornar 404', async () => {
      const response = await request.patch(`${url}/000000000000000000000000`).send({
        porte: "Grande"
      });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Animal não encontrado para atualização.");
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
