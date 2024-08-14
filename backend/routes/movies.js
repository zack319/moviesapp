const router = require('express').Router();
require('dotenv').config();

let MovieModel = require('../models/movies.model');

router.route('/').post((req, res) => {
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
                username: user.username
            }
        });
    })
})