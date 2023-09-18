const dotenv = require("dotenv");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

dotenv.config();

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/discord/callback"
  },
  function(accessToken, refreshToken, profile, done){
        var userProfile = profile;
        return done(null, userProfile);
    }
));