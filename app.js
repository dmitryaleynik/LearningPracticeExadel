'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/article', require('./server/router/article'));
app.use('/user', require('./server/router/user'));


app.listen(3000);
