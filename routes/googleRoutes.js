const express = require("express");
const passport = require("passport");

googleRouter = express.Router();

googleRouter.get("/", passport.authenticate(
    'google', {scope: ['profile', 'email']}
));

googleRouter.get("/callback", 
    passport.authenticate('google', {
        successRedirect: 'callback/success',
        failureRedirect: 'callback/error'
    })
);

googleRouter.get('/callback/success', (req,res) => {
    res.render('successGoogle', {user: req.user});
});

googleRouter.get('/callback/error', (req,res) =>{
    res.send("Error Logging In");
});

googleRouter.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
    res.redirect('/');
  });
});


module.exports = googleRouter;