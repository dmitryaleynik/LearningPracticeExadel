class ArticleDb {

    constructor() {
        this.mongoose = require('./mongoose');
        this.schema = this.mongoose.Schema({
            id: String,
            title: String,
            summary: String,
            createdAt: Date,
            author: String,
            content: String
        });

        this.model = this.mongoose.model('articles', this.schema);
    }

    getArticles(filter) {
        return this.model.find(filter);
    }

}

module.exports = new ArticleDb();