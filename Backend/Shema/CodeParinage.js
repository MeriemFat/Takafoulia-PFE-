const mongoose = require("mongoose"); 

const CodeParinage = new mongoose.Schema({ 
    _id:String , 
    code:String, 
}); 
module.exports = CodeParinage; 