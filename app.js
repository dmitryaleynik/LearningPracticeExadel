'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('diskdb');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect('./data/', ['articles', 'curUser', 'users']);


app.get('/articles', (req, res) => {
	res.send(db.articles.find());
});

app.get('/curUser', (rq, res) => {
	res.send(db.curUser.find());
});


app.post('/articles', (req, res) => {
	db.articles.remove();
	db.loadCollections(['articles']);
	db.articles.save(req.body);
	res.json(req.body);
});

app.post('/login', (req, res) => {
	const reqUser = req.body;
	const users = db.users.find();
	const user = users.find(user => user.name === reqUser.name && user.password === reqUser.password);
	if (!user) res.status(400).send('Wrong password or userName');
	else {
		db.curUser.save(user);
		res.json(reqUser);
	}
});


app.delete('/logout', (req, res) => {
	db.curUser.remove();
	db.loadCollections(['curUser']);
	res.json({wasRemoved: 'ok'});
});


app.get('/*', function (req, res) {
	res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(3000, function () {});
