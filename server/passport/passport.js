// let passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const userMapper = require('./../diskdb/mappers/user-mapper');
//
// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         let user = userMapper.searchUser({username: username, password: password});
//         if (user.length === 0) {
//             return done(null, false, {message: 'wrong'});
//         }
//         return done(null, user);
//     }
// ));
//
// passport.serializeUser(function(user, done) {
//    done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//
// });