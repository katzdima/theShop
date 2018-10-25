const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    customer: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    cart: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    totalPrice: Number,
    city: String,
    street: String,
    deliveryDate:Date,
    orderDate:Date,
    paiment: Number
    
});


 const Order= mongoose.model('Order', orderSchema );
 module.exports = Order ;