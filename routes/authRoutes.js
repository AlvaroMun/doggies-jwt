const {
    Router
} = require("express");
const {
    singup_get,
    singup_post,
    login_get,
    login_post
} = require("../controllers/authController");

const router = Router();


router.get('/singup', singup_get);
router.post('/singup', singup_post);
router.get('/login', login_get);
router.post('/login', login_post);
// router.get('/logout', ()=>{});


module.exports = router;