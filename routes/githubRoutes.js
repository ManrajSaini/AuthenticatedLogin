const express = require("express");
const passport = require("passport");

githubRouter = express.Router();

githubRouter.get("/", passport.authenticate(
    'github', {scope: ['profile', 'email']}
));

githubRouter.get("/callback", 
    passport.authenticate('github', {
        successRedirect: 'callback/success',
        failureRedirect: 'callback/error'
    })
);

githubRouter.get('/callback/success', (req,res) => {
    res.render('successGithub', {user: req.user});
});

githubRouter.get('/callback/error', (req,res) =>{
    res.send("Error Logging In");
});

module.exports = githubRouter;