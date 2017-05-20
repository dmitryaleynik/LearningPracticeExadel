const express = require('express');
const router = express.Router();
const articleDb = require('./../db/article-db');

router.get('/articles', (req, res) => {

  articleDb.getArticles(JSON.parse(req.query.parameters)).exec((err, articles) => {
    res.send(articles);
  });
});

router.get('/article/:id', (req, res) => {
  articleDb.getArticle(req.params.id).exec((err, article) => {
    if (err) return err;
    res.send(article);
  });
});

router.post('/article/', (req, res) => {
  articleDb.addArticle(req.body).exec(err => {
    if (err) return err;
    res.json({status: 'saved'});
  });
});

router.delete('/delete/:id', (req, res) => {
  articleDb.removeArticle(req.params.id).exec(err => {
    if (err) return err;
    res.json({status: 'deleted'});
  });
});

router.patch('/edit/:id', (req, res) => {
  articleDb.editArticle(req.params.id, req.body).exec(err => {
    if (err) return err;
    res.json({status: 'modified'});
  });
});

module.exports = router;