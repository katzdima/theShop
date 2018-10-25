const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    product: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantity: Number,
    totalPrice: Number,
    cart: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }]
});


 const Item= mongoose.model('Item', itemSchema );
 module.exports = Item ;