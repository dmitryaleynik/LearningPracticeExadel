const express = require('express');
const router = express.Router();
const passport = require('./../passport/passport');

router.get('/curUser/', (req, res) => {
   req.user ? res.send(req.user.username) : res.sendStatus(401);
});

router.post('/signin', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}),
    (req, res) => {
   console.log(req.body);
   console.log(res.user);
   res.sendStatus(200);
});

router.delete('/logout', (req, res) => {
   req.logout();
   res.sendStatus(200);
});

module.exports = router;
