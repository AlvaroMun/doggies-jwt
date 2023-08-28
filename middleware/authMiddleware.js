const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, "alvaro secret", (err, decodedToken) => {
            if (err) {
                res.redirect("/login")
            } else {
                next();
            }
        })
    } else {
        res.redirect("/login")
    }

}

module.exports = {
    authMiddleware
}