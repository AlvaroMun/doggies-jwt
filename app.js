const express = require('express');
const mongoose = require('mongoose')
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//database connection

const dbURI = "mongodb+srv://doggies-tuto:1234567891@doggies-jwt.kpsuf2p.mongodb.net/doggies-jwt-db?retryWrites=true&w=majority";
mongoose.connect(dbURI).then((resutl) => app.listen(5000)).catch((err) => console.log(err));


//routes
app.get("/", (req, res) => res.render('home'));
app.get("/doggies", (req, res) => res.render("doggies"));
app.use(authRoutes);

// app.get("/get-cookie", (req, res) => {

//     //vanila way of setting cookies
//     //res.setHeader("Set-cookie", "newUser=true")

//     res.cookie("newUser", false);
//     res.cookie("isEmployee", true, {
//         maxAge: 1000 * 60 * 60 * 24,
//         httpOnly: true
//     });

//     res.send("cookies set")

// })

// app.get("/read-cookies", (req, res) => {
//     const cookies = req.cookies;

//     res.json(cookies);
// })