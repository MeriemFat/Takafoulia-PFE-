const mongoose = require('mongoose');

const demandeContratSchema =  mongoose.Schema({ 
    contrat: {
        type: mongoose.Schema.Types.String,
        ref: 'Contrat',
        required: true
    },
    nom:{
    type:String , 
    required:true
    }, 
    email:{
    type: String ,
    required : true 
    },
    description:{ 
        type:String,
        required: true 
    }, 

});
const DemandeContrat = mongoose.model('DemandeContrat', demandeContratSchema);
module.exports = DemandeContrat;
