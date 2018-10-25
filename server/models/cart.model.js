const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    createDate: Date,
    active:Boolean,
    customer: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});


 const Cart= mongoose.model('Cart', cartSchema );
 module.exports = Cart ;