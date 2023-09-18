const express = require("express");
const passport = require("passport");

twitterRouter = express.Router();

twitterRouter.get("/", passport.authenticate(
    'twitter', {scope: ['tweet.read', 'users.read']}
));

twitterRouter.get("/callback",
    passport.authenticate('twitter', {
        successRedirect: 'callback/success',
        failureRedirect: 'callback/error'
    })
);

twitterRouter.get('/callback/success', (req,res) => {
    console.log(req.user)
    res.render('successTwitter', {user: req.user});
});

twitterRouter.get('/callback/error', (req,res) =>{
    res.send("Error Logging In");
});

module.exports = twitterRouter;