const mongoose = require('mongoose');

const ListAgentSchema =  mongoose.Schema({
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Référence au modèle User
    }, 
    nomUser:{ 
        type : String,
        required: true
    },   
    nomComplet:{ 
    type:String ,
    required:true 
    },
    email:{ 
        type: String, 
        required:true
    }, 
    password:{ 
        type:String, 
        required:true
    }, 
    cpt_Actif:
    {
    type:String, 
    required:true
    },
    libellerAgent:{
     type:String, 
     required:true
    }
});
const ListAgent = mongoose.model('ListAgent', ListAgentSchema); // Création du modèle à partir du schéma

module.exports = ListAgent; 