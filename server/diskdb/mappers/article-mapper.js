'use strict';
class ArticleMapper {

    constructor() {
        this.db = require('diskdb');
        this.connect = this.db.connect(__dirname + '/../data', ['articles']);
    }

    getArticles() {
        return this.db.articles.find();
    }

    getArticle(id) {
        return this.db.articles.find({id: id});
    }

    addArticle(article) {
        return this.db.articles.save(article);
    }

    removeArticle(id) {
        return this.db.articles.remove({id: id});
    }

}

module.exports = new ArticleMapper();