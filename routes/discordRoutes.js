const express = require("express");
const passport = require("passport");

discordRouter = express.Router();

discordRouter.get("/", passport.authenticate(
    'discord', {scope: ['identify', 'email', 'guilds', 'guilds.join']}
));

discordRouter.get("/callback", 
    passport.authenticate('discord', {
        successRedirect: 'callback/success',
        failureRedirect: 'callback/error'
    })
);

discordRouter.get('/callback/success', (req,res) => {
    res.render('successDiscord', {user: req.user});
});

discordRouter.get('/callback/error', (req,res) =>{
    res.send("Error Logging In");
});

module.exports = discordRouter;