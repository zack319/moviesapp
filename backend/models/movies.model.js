const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
	name: {type: String, required: true, unique: true},
	year: {type: Number, required: true},
	picturePath: {type: String, required: false, default: ''},
	image: {type: String, required: true, default: ''},
	imageType: {type: String, required: true},
	dateAdded: {type: Date, required: true, default: Date.now()},
	userId: {type: String, required: true}
}, {
	timestamps: true
});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;
