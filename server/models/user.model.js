const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    username: String,
    firstname: String,
    lastname: String,
    email :{type: String,required: true, unique: true, sparse: true},
    pwd: String,
    city: String,
    street: String,
    role: String
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema );
module.exports = User;