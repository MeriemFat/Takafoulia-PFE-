const mongoose = require('mongoose'); 
const concatenationSinistre = mongoose.Schema({ 
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client' // Référence vers le modèle User
    },
    contrat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contrat' // Référence vers le modèle Contrat
    },
    nom:{
        type:String,
        required:true
    },
prenom:{
    type:String,
    required:true
}, 
password:{
    type:String ,
     required:true
    },
dateNaissance :{
     type: Date,
     required:true
    },
Cin:{
    type:String , 
    required: true ,
     unique: true
    },
adresse1:{
    type:String,
     required:true
    }, 
adresse2:{
    type: String,
    required:true
},
NumTel:{
    type: Number,
     required: true
},
mobile:{
    type:String ,
     required:true
},  
email:{
    type: String, 
    required: true
}, 
CodeClient:{
    type:String ,
     required:true
    }, 
    numSinistre: {
        type:String,
        required:true
    },
    codeAgence:{ 
        type:String, 
        required: true 
    },
  
    dateDouverture: {
        type: Date ,
         require:true
        }, 
    dateSurvenance:{
        type:Date, 
        required: true
    }, 
    montantAregle: {
        type : Number, 
        required: true 
    },  
    etatRéglement:{
        type:String ,
         required: true 
        }, 
    natureSinistre: {
        type: String,
        required: true  // Valider les valeurs avec l'énumération
    }}, 

{
timestamps: true, 
}); 

const ConcatenationSinistre = mongoose.model('ConcatenationSinistre', concatenationSinistre); 
module.exports = ConcatenationSinistre