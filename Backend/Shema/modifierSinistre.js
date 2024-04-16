const mongoose =require("mongoose"); 
// Shéma pour le shéma Contrat
const modifierSinistreShema =  mongoose.Schema({ 
numSinistre:{
    type: String,
    unique: true, // Assure l'unicité du champ NumPolice
    required: true // Assure que ce champ est obligatoire
},
CodeClient: {
    type: String, 
    required:true, 
}, 
codeAgence:{
    type :String,
     required:true
}, 
dateDouverture:{
    type:Date, 
    required:true
}, 
dateSurvenance:{
    type:Date, 
    required:true
}, 
montantAregle:{
    type:Number, 
    required:true
}, 
etatRéglement:{
    type:String ,
     required:true
    }, 
natureSinistre:{
    type:String , 
    required:true
}, 
},{
    timestamps: true,
  }); 
const ModifierSinistre = mongoose.model('ModifierSinistre', modifierSinistreShema);
module.exports = ModifierSinistre; 
