const User = require('../models/User');
const jwt = require("jsonwebtoken");


//aux function
const MAX_AGE = 60 * 60 * 12;
const createToken = (id) => {
    return jwt.sign({
        id
    }, "alvaro secret", {
        expiresIn: MAX_AGE
    })
}

const signup_get = (req, res) => {
    res.render('singup')
};

const login_get = (req, res) => {
    res.render('login')
}
const signup_post = async (req, res) => {


    try {
        console.log(req.body)
        const {
            email,
            password
        } = req.body;
        const user = await User.create({
            email,
            password
        });
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: MAX_AGE * 1000
        })
        res.status(200).json({
            user: user._id
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const login_post = async (req, res) => {
    const {
        email,
        passowrd
    } = req.body;
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
}