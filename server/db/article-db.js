class ArticleDb {

  constructor() {
    this.mongoose = require('./mongoose');
    this.schema = this.mongoose.Schema({
      title: String,
      summary: String,
      createdAt: Date,
      author: String,
      content: String
    });
    this.model = this.mongoose.model('articles', this.schema);
  }

  getArticles(parameters) {
    return this.model.find(parameters.filter).sort({createdAt: -1}).limit(parameters.top);
  }

  getArticle(id) {
    return this.model.findOne({_id: id});
  }

  addArticle(article) {
    let art = new this.model(article);
    art.save();
  }

  removeArticle(id) {
    return this.model.remove({_id: id});
  }

  editArticle(id, article) {
    return this.model.findOneAndUpdate({_id: id}, article);
  }
}

module.exports = new ArticleDb();