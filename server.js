const dotenv = require("dotenv");
const express = require("express");
const passport = require("passport");
const path = require("path");
const session = require("express-session");

const googleRouter = require("./routes/googleRoutes");
const githubRouter = require("./routes/githubRoutes");
const linkedinRouter = require("./routes/linkedinRoutes");

require("./authentication/googleAuth");
require("./authentication/githubAuth");
require("./authentication/linkedinAuth");

dotenv.config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", googleRouter);
app.use("/auth/github", githubRouter);
app.use("/auth/linkedin", linkedinRouter);

app.get("/", (req,res) => {
    return res.render('auth');
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started");
});