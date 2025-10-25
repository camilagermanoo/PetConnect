const animalPerdidoEncontrados = require("../models/AnimaisPerdidosEncontrados");

exports.registrarAnimal = async(req,res) => {
    try{
        const dadosdoAnimal = req.body;
        const novoAnimal = new animalPerdidoEncontrados(dadosdoAnimal);
        const animalSalvo = await novoAnimal.save();
        res.status(201).json(animalSalvo)
    }
    catch(error){
        res.status(400).json({message:"Erro ao Registrar o Animal: ", error: error.message})
    }
}

exports.listarTodos = async(req,res) => {
    try{
        const animais = await animalPerdidoEncontrados.find(); 
        res.status(200).json(animais); 
    }catch(error){
        res.status(500).json({message:"Erro interno do Servidor", error: error.message}) 
    }
}

exports.listarPorId = async(req,res) => {
    try{
        const animais = await animalPerdidoEncontrados.findById(req.params.id);

        if(animais === null){
            return res.status(404).json({message:"Erro, ID não encontrado"})
        }
        res.status(200).json(animais);
    }
    catch(error){
        res.status(500).json({message:"Erro interno do servidor", error: error.message})
    }
}

exports.atualizarAnimal = async(req,res) => {
    try{
        const animais = await animalPerdidoEncontrados.findByIdAndUpdate(req.params.id, req.body, {new:true});

         if(animais === null){
            return res.status(404).json({message:"Erro, ID não encontrado"})
        }
        res.status(200).json(animais);
        
    }
    catch(error){
        res.status(500).json({message:"Erro interno do servidor", error: error.message})
    }
}

exports.deletarAnimal = async(req,res) => {
    try{
        const animais = await animalPerdidoEncontrados.findByIdAndDelete(req.params.id);
        if(animais === null){
            return res.status(404).json({message:"Erro, ID não encontrado"})
        }
        res.status(200).json(animais)
    }
    catch(error){
        res.status(500).json({message:"Erro interno do servidor", error: error.message})
    }
}
