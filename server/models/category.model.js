const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    //_id: Schema.Types.ObjectId,
    name: String,
});

const Category = mongoose.model('Category', categorySchema );
module.exports = Category;