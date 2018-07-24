const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    name: String,
    category: Number,
    price: Number,
    image: String
});


module.exports = mongoose.model('Product', productSchema );