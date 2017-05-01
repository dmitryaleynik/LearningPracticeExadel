;!function(articleService, GridItemView, ArticleDetailsInitialization, EditArticleInitialization,
    PaginationInitialization) {
    "use strict";

    class GridInitialization {


        constructor() {
            this.curArticle = "";
            this.grid = document.querySelector('.news-grid');
            document.body.addEventListener('click', this.onClicked.bind(this));
        }


        init(articles) {
            if (!articles) {
                articleService.getArticles().then(articles => {
                    this.articles = articles;
                    this.pagination = new PaginationInitialization(articles);
                    this.render();

                });
            } else {
                //this.pagination = new PaginationInitialization(articles);
                this.articles = articles;
                this.render();
            }
        }

        render() {
            this.grid.innerHTML = '';
            this.articles.forEach(item => {
                this.grid.appendChild(new GridItemView(item).render());
            });
        }

        onClicked(event) {
            console.log(event.target.dataset.response);
            switch(event.target.dataset.purpose) {
                case 'details':
                    this.curArticle = new ArticleDetailsInitialization().init();
                    break;
                case 'back':
                    this.init();
                    this.curArticle = "";
                    break;
                case 'new-article-submit':
                    const form = document.forms['new-article-form'];
                    const article = {};
                    article.id = (Number(articleService.maxId) + 1).toString();
                    article.title = form.elements['title'].value;
                    article.summary = form.elements['summary'].value;
                    article.createdAt = new Date(form.elements['date'].value);
                    article.content = form.elements['content'].value;
                    article.author = 'Vova';
                    articleService.addArticle(article).then(() => {
                        this.init();
                    });
                    break;
                case 'remove':
                    articleService.removeArticle(event.target.parentNode.parentNode.dataset.id).then(id => {
                        this.init();
                    });
                    break;
                case 'edit':
                    new EditArticleInitialization().init();
                    break;
                case 'edit-article-submit':
                    const form2 = document.forms['edit-article-form'];
                    const article2 = {};
                    if (form2.elements['title'].value)
                        article2.title = form2.elements['title'].value;
                    if (form2.elements['content'].value)
                        article2.content = form2.elements['content'].value;
                    if (form2.elements['summary'].value)
                        article2.summary = form2.elements['summary'].value;
                    articleService.editArticle(this.curArticle.dataset.id, article2).then(() => {
                       this.init();
                    });
                    break;
                case 'show-more':
                    this.pagination.showMore().then (articles => {
                        this.init(articles);
                    });
                    break;
            }
        }
    }

    window.GridInitialization = GridInitialization;
}(window.articleService, window.GridItemView, window.ArticleDetailsInitialization, window.EditArticleInitialization,
    window.PaginationInitialization);