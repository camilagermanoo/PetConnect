const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
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
    enum: ['Pequeno', 'Médio', 'Grande'],
    required: [true, 'O porte do animal é obrigatório.'],
  },
  status_adocao: {
    type: String,
    enum: ['Disponível', 'Adotado'],
    default: 'Disponível',
  }
}, { timestamps: true }); // timestamps adiciona createdAt e updatedAt automaticamente

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;