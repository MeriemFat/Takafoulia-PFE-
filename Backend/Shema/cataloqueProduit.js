const mongoose = require("mongoose"); 

const CataloqueProduit = new mongoose.Schema({ 
    idCataloqueProduit:String , 
    intitulerProduit:String, 
    TypeProduit:{ 
        type:String , 
        enum:['profesionnelle, particulier'], 
    }
}); 
module.exports = CataloqueProduit; 