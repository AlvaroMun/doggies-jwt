const singup_get = (req, res) => {
    res.render('singup')
};

const login_get = (req, res) => {
    res.render('login')
}
const singup_post = (req, res) => {
    res.send("new singup")
}
const login_post = (req, res) => {
    res.send("new login")
}

module.exports = {
    singup_get,
    singup_post,
    login_get,
    login_post
}