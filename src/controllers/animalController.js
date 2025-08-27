const Animal = require('../models/Animal');

// Função para CADASTRAR um novo animal (POST)
exports.createAnimal = async (req, res) => {
  try {
    const novoAnimal = new Animal(req.body);
    const animalSalvo = await novoAnimal.save();
    res.status(201).json({ message: "Animal cadastrado com sucesso!", animal: animalSalvo });
  } catch (error) {
    res.status(400).json({ message: "Erro ao cadastrar animal", error: error.message });
  }
};

// Função para LISTAR todos os animais (GET)
exports.getAllAnimals = async (req, res) => {
  try {
    const animais = await Animal.find({});
    res.status(200).json(animais);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar animais", error: error.message });
  }
};

// Função para BUSCAR um animal por ID (GET by ID)
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: "Animal não encontrado." });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar animal", error: error.message });
  }
};

// Função para ATUALIZAR um animal por ID (PUT)
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!animal) {
      return res.status(404).json({ message: "Animal não encontrado para atualização." });
    }
    res.status(200).json({ message: "Dados do animal atualizados!", animal });
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar animal", error: error.message });
  }
};

// Função para DELETAR um animal por ID (DELETE)
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: "Animal não encontrado para exclusão." });
    }
    res.status(200).json({ message: "Animal removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar animal", error: error.message });
  }
};