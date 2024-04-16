// create Node.js server application
const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("The server is active on port 3000");
});
app.get("/", (req, res) => {
  res.send("MongoDB Express ");
});

// Importation du fichier db.js pour gérer la connexion à la base de données
const connectDB = require('../Backend/config/db.js');
connectDB()

// Importation des schémas Mongoose
const sinistre = require("./Shema/Sinistre");
const cataloqueProduit = require("./Shema/cataloqueProduit");
const codeParinage = require("./Shema/CodeParinage");
const demande = require("./Shema/Demande");
const contrat = require("./Shema/Contrat");
const formulaireProduit = require("./Shema/FormulaireProduit");
const quittanceSchema = require("./Shema/Quittance");
const user = require("./Shema/User");
const listAgent = require("./Shema/ListAgent.js"); 
const listeClient= require("./Shema/ListeClient.js"); 
const concatenation = require("./Shema/concatUserAndContrat.js");
const client = require("./Shema/Client.js"); 
const modifiercontrat = require ("./Shema/modifierContrat.js"); 
const modifierSinistre = require("./Shema/modifierSinistre.js")
const demandeContrat = require("./Shema/DemandeContrat.js"); 
const concatenationsinistre = require("./Shema/concatUserAndSinistre.js"); 
// Using schema to build Mongoose models
const mongoose = require("mongoose");
// Création des modèles Mongoose à partir des schémas
const CataloqueProduit = mongoose.model("CataloqueProduit", cataloqueProduit);
const CodeParinage = mongoose.model("CodeParinage", codeParinage);
const Demande = mongoose.model("Demande", demande);
const FormulaireProduit = mongoose.model("FormulaireProduit", formulaireProduit);
const Quittance = mongoose.model("Quittance", quittanceSchema); 
// Exportation des modèles et de la base de données
module.exports = {
  Sinistre: sinistre,
  CataloqueProduit: cataloqueProduit,
  CodeParinage: codeParinage,
  Demande: demande,
  FormulaireProduit: formulaireProduit,
  Quittance: quittanceSchema,
  User: user,
  ListAgent :listAgent, 
  ListeClient :listeClient, 
  Client:client ,
  Concatenation : concatenation,
  Contrat: contrat,
  ModifierContrat:modifiercontrat,
  ModifierSinistre: modifierSinistre, 
  DemandeContrat:demandeContrat, 
  ConcatenationSinistre : concatenationsinistre, 
};
