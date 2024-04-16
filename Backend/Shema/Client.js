const mongoose = require('mongoose'); 
const client= mongoose.Schema({ 
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
Cin: {type:String , 
  required: true ,
   unique: true
  },
adresse1: {
  type:String,
   required:true
  }, 
adresse2:{
  type: String ,
  required:true
},
NumTel: {type: Number,
   required: true
  },
mobile:{
  type:String ,
   required:true
  },  
email: {
  type: String,
   required: true
  }, 
  CodeClient: {
    type:String, 
    required: true 
}, 
},{
    timestamps: true,
  });

const Client = mongoose.model('Client', client);
module.exports = Client; 