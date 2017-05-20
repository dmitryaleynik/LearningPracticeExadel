;!function(articleService, GridItemView, ArticleDetailsInitialization, EditArticleInitialization,
           PaginationInitialization, FilterInitialization) {
  "use strict";

  class GridInitialization {


    constructor() {
      this.curArticle = "";
      this.grid = document.querySelector('.news-grid');
      document.body.addEventListener('click', this.onClicked.bind(this));
      document.querySelector('#filter').addEventListener('change', this.onChange.bind(this));
      this.showable = {pagination: document.querySelector('#pagination-button')};
    }


    init(articles) {
      if (!articles) {
        articleService.getArticles(0, this.filter).then(articles => {
          this.articles = articles;
          this.setFilterSection();
          this.pagination = new PaginationInitialization(articles);
          this.articles = this.articles.slice(0, 3);
          this.render();
        });
      } else {
        this.articles = articles;
        this.setFilterSection();
        this.pagination = new PaginationInitialization(articles);
        this.articles = this.articles.slice(0, 3);
        this.render();
      }
    }

    setFilterSection() {
      if (!this.showable.filter) {
        let authors = new Set();
        this.articles.forEach(item => {
          authors.add(item.author);
        });
        new FilterInitialization(Array.from(authors)).render();
        this.showable.filter = document.querySelector('.filter-section');
      }
    }

    render() {
      this.grid.innerHTML = '';
      this.articles.forEach(item => {
        this.grid.appendChild(new GridItemView(item).render());
      });
    }

    onClicked(event) {
      switch (event.target.dataset.purpose) {
        case 'details':
          Object.keys(this.showable).forEach(key => {
            this.showable[key].hidden = true;
          });
          this.curArticle = new ArticleDetailsInitialization().init();
          break;
        case 'back':
          Object.keys(this.showable).forEach(key => {
            this.showable[key].hidden = false;
          });
          this.init();
          this.curArticle = "";
          break;
        case 'new-article-submit':
          Object.keys(this.showable).forEach(key => {
            this.showable[key].hidden = false;
          });
          const form = document.forms['new-article-form'];
          const article = {};
          article.title = form.elements['title'].value;
          article.summary = form.elements['summary'].value;
          article.createdAt = new Date(form.elements['date'].value);
          article.content = form.elements['content'].value;
          article.author = window.curUser;
          if (!articleService.validateArticle(article, true))
            break;
          articleService.addArticle(article).then(() => {
            this.init();
          });
          break;
        case 'remove':
          articleService.removeArticle(event.target.parentNode.parentNode.dataset.id).then(() => {
            this.init();
          });
          break;
        case 'edit':
          new EditArticleInitialization().init();
          break;
        case 'edit-article-submit':
          Object.keys(this.showable).forEach(key => {
            this.showable[key].hidden = false;
          });
          const form2 = document.forms['edit-article-form'];
          const article2 = {};
          if (form2.elements['title'].value)
            article2.title = form2.elements['title'].value;
          if (form2.elements['content'].value)
            article2.content = form2.elements['content'].value;
          if (form2.elements['summary'].value)
            article2.summary = form2.elements['summary'].value;
          if (!articleService.validateArticle(article2, false))
            break;
          articleService.editArticle(this.curArticle.dataset.id, article2).then(() => {
            this.init();
          });
          break;
        case 'show-more':
          this.pagination.showMore().then(articles => {
            this.articles = articles;
            this.render();
          });
          break;
      }
    }

    onChange(event) {
      this.filter = {author: event.currentTarget.value};
      this.init();
    }
  }
  window.GridInitialization = GridInitialization;
}(window.articleService, window.GridItemView, window.ArticleDetailsInitialization, window.EditArticleInitialization,
  window.PaginationInitialization, window.FilterInitialization);