const mongoose = require("mongoose");
const {
    isEmail
} = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "Min password length is 6 characters"]
    }
})

//fired before user is saved
userSchema.post("save", function (doc, next) {
    next();
})


//fired after user is saved(important to use function notation because of the "this" usage)
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// name must be singular of what we called our collection, in this case collection is users
const User = mongoose.model('user', userSchema);

module.exports = User;