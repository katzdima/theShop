const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    personsID: Number,
    pwd: String,
    adress: Object
});


module.exports = mongoose.model('Costumer', userSchema );