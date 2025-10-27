const mongoose = require('mongoose');

const animalPerdidoSchema = new mongoose.Schema({
    nome:{
        type:String,
        required:true,
        trim: true,
    },
    especie:{
        type:String,
        required:true,
        trim: true,
    },
    idade:{
        type:Number,
        required:true,
    },
    porte:{
        type:String,
        enum:["Miniatura","Pequeno","Médio","Grande","Gigante"],
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["Encontrado", "Perdido"]
    },
    descricao:{
        type:String,
        required:true,
        trim: true,
    },
    contato:{
        type:String,
        required:true,
        trim:true
    },
    local:{
        type:String,
        required:true,
        trim:true
    }
})
