const mongoose = require("mongoose"); 

const Demande = new mongoose.Schema({ 
_id:String ,
TypeDemande:{ 
    type:String, 
    enum:['Contrat , Sinistre , autre'], 
}, 
TypeModification:{ 
    Type:String, 
    enum:['Contrat, Sinistre , Autre '], 
}, 
TypeReclamation : { 
    Type:String , 
    enum : ['Contrat , Sinistre , Autre'], 
}, 
});
module.exports = Demande; 