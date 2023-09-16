const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SECRET
}));

app.get("/", (req,res) => {
    return res.render('pages/auth');
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started");
});


// ***************Passport setup***************
const passport = require("passport");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req,res) => {
    res.render('success', {user: userProfile});
});

app.get('/error', (req,res) =>{
    res.send("Error Logging In");
});

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});


// **************Google Auth***************
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.get("/auth/google", passport.authenticate(
    'google', {scope: ['profile', 'email']}
));

app.get("/auth/google/callback", passport.authenticate(
        'google', {failureRedirect: '/error'}
    ),
    function(req,res){
        res.redirect('/success');
    }
);