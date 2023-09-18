const express = require("express");
const passport = require("passport");

linkedinRouter = express.Router();

linkedinRouter.get("/", passport.authenticate(
    'linkedin', {scope: ['profile', 'email', 'openid']}
));

linkedinRouter.get("/callback",
    passport.authenticate('linkedin', {
        successRedirect: 'callback/success',
        failureRedirect: 'callback/error'
    })
);

linkedinRouter.get('/callback/success', (req,res) => {
    res.render('successLinkedin', {user: req.user});
});

linkedinRouter.get('/callback/error', (req,res) =>{
    res.send("Error Logging In");
});

module.exports = linkedinRouter;