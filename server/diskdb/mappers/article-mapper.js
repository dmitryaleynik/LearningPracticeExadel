'use strict';
class ArticleMapper {

    constructor() {
        this.db = require('diskdb');
        this.connect = this.db.connect(__dirname + '/../data', ['articles']);
        this.MongoClient = require('mongodb').MongoClient;
        this.assert = require('assert');
        this.url = 'mongodb://localhost:27017/newsportal';

    }

    getArticles(parameters) {
        this.MongoClient.connect(url, (err, db) => {
           this.assert.equal(err, null);

            let articles;
            if (parameters.filter.author === "")
                articles = this.db.articles.find();
            else
                articles = this.db.articles.find(parameters.filter);
            articles = articles.sort((a, b) => {
                return (a.createdAt < b.createdAt) ? 1 : -1;
            });
            if (!parameters.top)
                return articles;
            articles = articles.slice(0, parameters.top);
            return articles;
        });
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