const express = require('express');
const router = express.Router();
const userMapper = require('./../diskdb/mappers/user-mapper');

router.get('/curUser/', (req, res) => {
   res.send(userMapper.getCurrentUser());
});

router.post('/login/', (req, res) => {
   let user = req.body;
   if (userMapper.searchUser(user).length !== 0) {
      userMapper.login(user);
      res.json(req.body);
   } else {
      res.status(400).send('Wrong login or password! Please try again!');
   }
});

router.delete('/logout/', (req, res) => {
   userMapper.logout();
   res.json(req.body);
});

module.exports = router;
