const dotenv = require("dotenv");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

dotenv.config();

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/linkedin/callback",
        scope: ['profile', 'email', 'openid']
    },

    function(accessToken, refreshToken, profile, done){
        var userProfile = profile;
        return done(null, userProfile);
    }
));

