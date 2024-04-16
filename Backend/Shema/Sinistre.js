const mongoose = require("mongoose");

// Définir les valeurs possibles pour natureSinistre
const natureSinistreEnum = ['Recour', 'Defonce', 'corporelle'];
const etatRéglement=['ouvert','cloturer'];
// Définir le schéma de sinistre
const sinistre =  mongoose.Schema({
    numSinistre: {
        type:String,
        required:true
    },
    codeAgence:{ 
        type:String, 
        required: true 
    },
    CodeClient: {
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
         enum:etatRéglement
        }, 
    natureSinistre: {
        type: String,
        enum: natureSinistreEnum // Valider les valeurs avec l'énumération
    }
});
const Sinistre = mongoose.model("Sinistre", sinistre);
// Exporter le modèle Sinistre
module.exports = Sinistre;
