const mongoose = require('mongoose'); 

const concatenation = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client' // Référence vers le modèle User
    },
    contrat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contrat' // Référence vers le modèle Contrat
    },
  name: { 
    type: String, 
    required: true, 
  }, 
  email: { 
    type: String, 
    required: true, 
    unique: true, 
  },
  password:{
    type: String ,
     required:true,
    },
    NumPolice:{
      type: String, 
      unique: true, 
      required:true
    },
    CodeClient:{
      type: String, 
      required:true
    },
    DateDefait:{ 
      type : Date , 
      required:true, 
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
      required:true
    }, 
   DateDebutContrat:{
      type:Date ,
       required:true
      }, 
   FractionnementDePayement:{
      type:String , 
      required:true
  }},
  {
  timestamps: true,
});

const Concatenation = mongoose.model('Concatenation', concatenation);
module.exports = Concatenation; 
