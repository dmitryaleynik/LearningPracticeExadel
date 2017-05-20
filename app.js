const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore(
  {
    uri: 'mongodb://localhost:27017/newsportal',
    collection: 'sessions'
  });
const passport = require('./server/passport/passport');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(
  {
    name: 'sess',
    secret: 'curUser',
    resave: true,
    saveUninitialized: true,
    store: store
  }));
app.use(passport.initialize());
app.use(passport.session());



app.use('/article', require('./server/router/article'));
app.use('/user', require('./server/router/user'));


app.listen(3000);