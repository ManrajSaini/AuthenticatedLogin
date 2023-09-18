const dotenv = require("dotenv");
const passport = require("passport");
const TwitterStrategy = require("@superfaceai/passport-twitter-oauth2");

dotenv.config();

passport.use(new TwitterStrategy({
    clientID: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    clientType: 'confidential',
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    tokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    callbackURL: "http://localhost:8080/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done){
        var userProfile = profile;
        return done(null, userProfile);
    }
));