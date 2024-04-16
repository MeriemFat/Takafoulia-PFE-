const mongoose =require("mongoose"); 
// Shéma pour le shéma Contrat
const modifierContratShema =  mongoose.Schema({ 
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
Produit:{
    type:String , 
    required:true
}, 
},{
    timestamps: true,
  }); 
const ModifierContrat = mongoose.model('ModifierContrat', modifierContratShema);
module.exports = ModifierContrat; 
