const dotenv = require("dotenv");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

dotenv.config();

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done){
        var userProfile = profile;
        return done(null, userProfile);
    }
));