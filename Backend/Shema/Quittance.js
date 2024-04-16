const mongoose = require("mongoose");

const etatReglementQuittance = ['Arriere', 'Accompte', 'Règlé'];
// Define the user schema
const Quittance = new mongoose.Schema({
    numQuittance: {
        type: String,
        unique: true, // Assure l'unicité du champ numQuittance
        required: true // Assure que ce champ est obligatoire
    },
    dateEmission:String, 
    etatReglement:String, 
    resteRegler:String ,
    ContributionTotale:String,   
    EtatReglementQuittance: {
        type: String,
        enum: etatReglementQuittance // Valider les valeurs avec l'énumération
    } 
  });
  
  // Exporter le modèle Sinistre
  module.exports = Quittance;