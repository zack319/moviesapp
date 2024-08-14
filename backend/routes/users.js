const router = require('express').Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');

let UserModel = require('../models/users.model');
let MovieModel = require('../models/movies.model');

router.route('/login').post((req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            status: false,
            message: "Username or Password incorrect."
        });
    }

    UserModel.findOne({username})
    .then(user => {
        console.log(user);

        // test password crypt
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                status: false,
                message: "Username or Password incorrect."
            });
        }

        return res.status(200).json({
            status: true,
            message: "User Logged In Successfully.",
            userData: {
                name: user.name,
                username: user.username,
                userId: user._id
            }
        });
    })
})

router.route('/register').post((req, res) => {
    const { username, password, name } = req.body;
    console.log(username);
    console.log(password);

    if (password.length < 6) {
        return res.status(400).json({
            status: false,
            message: "Password is less than 6 characters."
        });
    }

    let salt = bcrypt.genSaltSync(10);

    let newUser = new UserModel({
        username: username,
        password: bcrypt.hashSync(password, salt),
        name: name
    });

    newUser.save()
    .then(response => {
        console.log(response);
        console.log('New User added successfully');
        res.status(200).json({
            status: true,
            message: 'User created successfully.'
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            status: false,
            message: 'Error when creating user. Please contact support.'
        })
    });
});

router.route('/movies').post((req, res) => {
    const { userId } = req.body;

    MovieModel.find({userId})
    .then(movies => {
        console.log(movies);

        return res.status(200).json({
            status: true,
            movies: movies
        });
    }).catch(err => {
        console.log(error);
        res.status(400).json({
            status: false,
            message: 'An error occured. Please contact support'
        })
    })
})

router.route('/addmovie').post((req, res) => {
    const { name, year, image, imageType, userId } = req.body;
    console.log(userId);

    const movie = new MovieModel({
        name,
        year,
        image,
        imageType,
        userId
    })

    movie.save()
    .then(response => {
        console.log(response);
        console.log('New Movie Added successfully');
        res.status(200).json({
            status: true,
            message: 'Movie added successfully.'
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            status: false,
            message: 'Error when adding movie. Please contact support.'
        })
    });
})

router.route('/editmovie').post((req, res) => {
    const { name, year, image, imageType, userId, movieId } = req.body;
    console.log(movieId);

    let updateData = {
        name: name,
        year: year,
        image: image,
        imageType: imageType,
        userId: userId
    };

    MovieModel.findByIdAndUpdate(movieId, updateData, {
        new: true,
        runValidators: true
    }).then(response => {
        res.status(200).json({
            message: 'Movie updated successfully',
            status: true
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: 'Error Occured while updating movie',
            status: false
        });
    })
})

module.exports = router;
