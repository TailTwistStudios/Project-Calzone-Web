const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/users", {
    useNewURLParser: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    uuid: String,
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData', User, 'userData');