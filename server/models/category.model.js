const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    //_id: Schema.Types.ObjectId,
    name: String,
});


module.exports = mongoose.model('Category', categorySchema );