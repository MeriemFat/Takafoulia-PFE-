const mongoose =require("mongoose"); 
const FormulaireProduit = new mongoose.Schema({ 
    _id:String , 
    Nom:String, 
    prénom:String, 
    Description : String, 
    Adresse :String, 
    Num_Cin : String, 
    }); 
module.exports= FormulaireProduit; 
