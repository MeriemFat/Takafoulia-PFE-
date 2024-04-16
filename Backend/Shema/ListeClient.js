const mongoose = require('mongoose');

const listeClientShema =  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Ajoutez d'autres champs spécifiques aux clients ici
    name: {
        type: String,
        required: true
    },
    email:{ 
        type: String , 
        required: true, 
        unique: true, 
    }, 
    password: { 
        type:String, 
        required:true, 
    }
    
});
const ListeClient = mongoose.model('ListeClient', listeClientShema);

module.exports = ListeClient;