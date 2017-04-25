;!function(articleService, GridItemView, ArticleDetailsInitialization, EditArticleInitialization) {
    "use strict";

    class GridInitialization {

        constructor() {
            this.grid = document.querySelector('.news-grid');
            this.grid.addEventListener('click', this.onClicked.bind(this));
        }


        init(articles) {
            if (!articles) {
                articleService.getArticles().then(articles => {
                    this.articles = articles;
                    this.render();
                });
            } else {
                this.render(articles);
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
                    new ArticleDetailsInitialization().init();
                    break;
                case 'back':
                    this.init();
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
                    break;
            }
        }
    }

    window.GridInitialization = GridInitialization;
}(window.articleService, window.GridItemView, window.ArticleDetailsInitialization, window.EditArticleInitialization);