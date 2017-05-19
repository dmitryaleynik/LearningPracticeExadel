const express = require('express');
const router = express.Router();
const articleDb = require('./../db/article-db');

router.get('/articles', (req, res) => {

    articleDb.getArticles(JSON.parse(req.query.parameters).filter).exec((err, articles) => {
        console.log('test');
        res.send(articles);
    });
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

router.patch('/edit/:id', (req, res) => {
    articleMapper.editArticle(req.params.id, req.body);
    res.json(req.params.id);
});

module.exports = router;