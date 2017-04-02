"use strict";
let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let db = require('diskdb');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect('./', ['articles', 'curUser']);


app.get('/articles', (req, res) => {
   res.send(JSON.stringify(db.articles.find()));
});

app.get('/curUser', (rq, res) => {
   res.send(JSON.stringify(db.curUser.find()));
});


app.post('/articles', (req, res) => {
   db.articles.remove();
   db.loadCollections(['articles']);
   db.articles.save(req.body);
   res.json(req.body);
});

app.post('/login', (req, res) => {
    db.curUser.save(req.body);
    res.json(req.body);
});

app.delete('/logout', (req, res) => {
    db.curUser.remove();
    db.loadCollections(['curUser']);
    res.json({wasRemoved: 'ok'});
});


app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(3000, function () {
    console.log('Pivet');
});
