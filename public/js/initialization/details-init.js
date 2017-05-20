;!function(ArticleDetailsView, articleService) {
    "use strict";

    class ArticleDetailsInitialization {

        init() {
            let curArticle = event.target.parentNode.parentNode;
            articleService.getArticle(curArticle.dataset.id).then (article => {
                let grid = new ArticleDetailsView(article).render();
            });
            return curArticle;
        }
    }

    window.ArticleDetailsInitialization = ArticleDetailsInitialization;
}(window.ArticleDetailsView, window.articleService);
