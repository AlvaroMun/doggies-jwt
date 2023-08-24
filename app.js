const express = require('express');
const mongoose = require('mongoose')
const authRoutes = require("./routes/authRoutes");

const app = express();

//middleware

app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

//database connection

const dbURI = "mongodb+srv://doggies-tuto:1234567891@doggies-jwt.kpsuf2p.mongodb.net/doggies-jwt-db?retryWrites=true&w=majority";
mongoose.connect(dbURI).then((resutl) => app.listen(5000)).catch((err) => console.log(err));


//routes
app.get("/", (req, res) => res.render('home'));
app.get("/doggies", (req, res) => res.render("doggies"));
app.use(authRoutes);