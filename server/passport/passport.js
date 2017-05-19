const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDb = require('./../db/user-db');

passport.use(new LocalStrategy(
    {passReqToCallback: true},
     (req, username, password, done) => {
         userDb.getUserByName(username).exec((err, user) => {
             if (err || !user) return done(null, false);

             if (!userDb.validatePassword(user, password)) {
                 return done(null, false);
             }

             return done(null, user);
         });
     }));

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;