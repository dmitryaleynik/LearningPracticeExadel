'use strict';
class ArticleMapper {

    constructor() {
        this.db = require('diskdb');
        this.connect = this.db.connect(__dirname + '/../data', ['articles']);
    }

    getArticles(parameters) {
        let articles = this.db.articles.find();
        articles = articles.sort((a, b) => {
            return (a.createdAt < b.createdAt) ? 1 : -1;
        });
        articles = articles.slice(parameters.skip, parameters.skip + parameters.top);
        return articles;
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

    editArticle(id, article) {
        return this.db.articles.update({id: id}, article);
    }

}

module.exports = new ArticleMapper();