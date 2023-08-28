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

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: ''
    };

    // incorrect email
    if (err.message === 'Invalid email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'Invalid password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({
            properties
        }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
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
        console.log({
            errors: handleErrors(error)
        });
        res.status(400).json({
            errors: handleErrors(error)
        })
    }
}
const login_post = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: MAX_AGE * 1000
        })

        res.status(200).json({
            user: user._id
        });
    } catch (error) {
        res.status(400).json({
            errors: handleErrors(error)
        })
    }
}

const logout_get = (req, res) => {
    res.cookie("jwt", "", {
        maxAge: 1
    })
    res.redirect("/");
}


module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}