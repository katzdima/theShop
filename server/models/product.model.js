const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    name: String,
    category: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    price: Number,
    image: String
});


 const Product= mongoose.model('Product', productSchema );
 module.exports = Product ;