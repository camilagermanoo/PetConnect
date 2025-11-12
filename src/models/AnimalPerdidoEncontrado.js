const mongoose = require('mongoose');

const animalPerdidoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome do animal é obrigatório.'],
        trim: true,
    },
    especie: {
        type: String,
        required: [true, 'A espécie do animal é obrigatória.'],
        trim: true,
    },
    idade: {
        type: Number,
        required: [true, 'A idade do animal é obrigatória.'],
    },
    porte: {
        type: String,
        enum: ["Pequeno", "Médio", "Grande"],
        required: [true, 'O porte do animal é obrigatório.'],
    },
    status: {
        type: String,
        required: [true, 'O status (Perdido/Encontrado) é obrigatório.'],
        enum: ["Encontrado", "Perdido"]
    },
    descricao: {
        type: String,
        required: [true, 'A descrição é obrigatória.'],
        trim: true,
    },
    contato: {
        type: String,
        required: [true, 'A informação de contato é obrigatória.'],
        trim: true
    },
    local: {
        type: String,
        required: [true, 'O local (onde foi perdido/encontrado) é obrigatório.'],
        trim: true
    }
}, { timestamps: true }); // Adiciona createdAt e updatedAt

const AnimalPerdidoEncontrado = mongoose.model('AnimalPerdidoEncontrado', animalPerdidoSchema);

module.exports = AnimalPerdidoEncontrado;