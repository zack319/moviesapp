const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true, minlength: 6},
    name: {type: String, required: true},
	role: {type: String, required: true, default: 'Basic'},
	token: {type: String},
    bookId: {type: String}
}, {
	timestamps: true
});

const User = mongoose.model('users', userSchema);

module.exports = User;
