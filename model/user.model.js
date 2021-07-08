const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModelSchema = new Schema({
    id: { type: Number, required: true },    
    name: String,          
    dob: Date,               
    address: String,           
    description: String,       
    createdAt: { type: Date, default:  Date()}          
});

// Compile model from schema
module.exports = mongoose.model('User', userModelSchema);