const AnimalPerdidoEncontrado = require("../models/AnimalPerdidoEncontrado");

// POST
exports.createAnimal = async (req, res) => {
    try {
        const novoAnimal = new AnimalPerdidoEncontrado(req.body);
        const animalSalvo = await novoAnimal.save();
        res.status(201).json({ message: "Animal perdido/encontrado cadastrado com sucesso!", animal: animalSalvo });
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar animal", error: error.message });
    }
};

// GET (Todos)
exports.getAllAnimals = async (req, res) => {
    try {
        const animais = await AnimalPerdidoEncontrado.find();
        res.status(200).json(animais);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar animais", error: error.message });
    }
};

// GET (por ID)
exports.getAnimalById = async (req, res) => {
    try {
        const animal = await AnimalPerdidoEncontrado.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado." });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar animal", error: error.message });
    }
};

// PUT
exports.updateAnimal = async (req, res) => {
    try {
        const animal = await AnimalPerdidoEncontrado.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado para atualização." });
        }
        res.status(200).json({ message: "Dados do animal atualizados!", animal });
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar animal", error: error.message });
    }
};

// PATCH
exports.updatePartialAnimal = async (req, res) => {
    try {
        const animal = await AnimalPerdidoEncontrado.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado para atualização." });
        }
        res.status(200).json({ message: "Animal atualizado com sucesso!", animal });
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar animal", error: error.message });
    }
};

// DELETE
exports.deleteAnimal = async (req, res) => {
    try {
        const animal = await AnimalPerdidoEncontrado.findByIdAndDelete(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: "Animal não encontrado para exclusão." });
        }
        res.status(200).json({ message: "Animal removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar animal", error: error.message });
    }
};