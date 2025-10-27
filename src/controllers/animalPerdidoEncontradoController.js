const animalPerdidoEncontrado = require("../models/AnimalPerdidoEncontrado");

                                        // POST //
exports.criarAnimal = async(req,res) => {
    try{
        const dadosdoAnimal = req.body;
        const novoAnimal = new animalPerdidoEncontrado(dadosdoAnimal);
        const animalSalvo = await novoAnimal.save();
        res.status(201).json({message:"Animal salvo com sucesso",animalSalvo})
    }
    catch(error){
        res.status(400).json({message:"Erro ao Registrar o Animal", error: error.message})
    }
}

                                        // GET //
exports.listarAnimal = async(req,res) => {
    try{
        const animal = await animalPerdidoEncontrado.find(); 
        res.status(200).json({message:"Animal Encontrado com sucesso",animal}); 
    }catch(error){
        res.status(500).json({message:"Erro interno do Servidor", error: error.message}) 
    }
}


                                        // GET (ID) //
exports.listarAnimalPorId = async(req,res) => {
    try{
        const animal = await animalPerdidoEncontrado.findById(req.params.id);

        if(!animal){
            return res.status(404).json({message:"Erro, Animal não encontrado"})
        }
        res.status(200).json({message:"Animal Encontrado com sucesso",animal});
    }
    catch(error){
        res.status(500).json({message:"Erro interno do servidor", error: error.message})
    }
}
                                        // PUT //
exports.atualizarAnimal = async(req,res) => {
    try{
        const animal = await animalPerdidoEncontrado.findByIdAndUpdate(req.params.id, req.body, {new:true});

         if(!animal){
            return res.status(404).json({message:"Erro, animal não encontrado"})
        }
        res.status(200).json({message:"Animal Alterado com sucesso", animal});
        
    }
    catch(error){
        res.status(500).json({message:"Erro interno do servidor", error: error.message})
    }
}



                                        // PATCH //
exports.atualizarParcialAnimal = async(req,res) => {
    try{
        const animal = await animalPerdidoEncontrado.findByIdAndUpdate(req.params.id, req.body, {new:true});

         if(!animal){
            return res.status(404).json({message:"Erro, Animal não encontrado"})
        }
        res.status(200).json({message:"Animal Alterado com sucesso", animal});
        
    }
    catch(error){
        res.status(500).json({message:"Erro interno do servidor", error: error.message})
    }
}


                                        // DELETE //
exports.excluirAnimal = async(req,res) => {
    try{
        const animal = await animalPerdidoEncontrado.findByIdAndDelete(req.params.id);
        if(!animal){
            return res.status(404).json({message:"Erro, Animal não encontrado"})
        }
        res.status(200).json({message:"Animal Deletado com sucesso", animal})
    }
    catch(error){
        res.status(500).json({message:"Erro interno do servidor", error: error.message})
    }
}
