'use strict';
const express = require('express');
const router = express.Router();
const articleMapper = require('./../diskdb/mappers/article-mapper');

router.get('/articles/', (req, res) => {
    res.send(articleMapper.getArticles());
});

router.get('/article/:id', (req, res) => {
   res.send(articleMapper.getArticle(req.params.id));
});

router.post('/article/', (req, res) => {
   articleMapper.addArticle(req.body);
   res.json(req.body);
});

router.delete('/delete/:id', (req, res) => {
    articleMapper.removeArticle(req.params.id);
    res.json(req.params.id);
});

module.exports = router;