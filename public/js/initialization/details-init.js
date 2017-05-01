;!function(ArticleDetailsView, articleService) {
    "use strict";

    class ArticleDetailsInitialization {

        init() {
            // pagination.showHide.hide();
            // filter.showHide.hide();
            let curArticle = event.target.parentNode.parentNode;
            //edit.init(CURRENT_ARTICLE);
            articleService.getArticle(curArticle.dataset.id).then (article => {
                let grid = new ArticleDetailsView(article).render();
            });
            return curArticle;
        }
    }

    window.ArticleDetailsInitialization = ArticleDetailsInitialization;
}(window.ArticleDetailsView, window.articleService);
