const mongoose =require("mongoose"); 

// Shéma pour le shéma Contrat
const contrat = mongoose.Schema({ 
    NumPolice:{
    type: String,
    unique: true, // Assure l'unicité du champ NumPolice
    required: true // Assure que ce champ est obligatoire
},
CodeClient: {
    type: String, 
    required:true, 
}, 
 DateDefait:{
    type :Date,
     required:true
}, 
 DescriptionAvenant:{
    type:String, 
    required:true
}, 
 PrimeTTC:{
    type:Number, 
    required:true
}, 
DateEchance:{
    type:Date, 
    required:true}, 
DateDebutContrat:{
    type:Date ,
     required:true
    }, 
FractionnementDePayement:{
    type:String , 
    required:true
}, 
// Référence à des produits dans un contrat
Produit:{ 
    type:String , 
    required:true
}, 
},{
    timestamps: true,
  }); 

const Contrat = mongoose.model('Contrat', contrat);
module.exports = Contrat; 
