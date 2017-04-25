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
                // edit.EDIT_BUTTON = document.querySelector('#edit-button');
                // edit.EDIT_BUTTON.addEventListener('click', edit.handleEditArticle);
        }
    }

    window.ArticleDetailsInitialization = ArticleDetailsInitialization;
}(window.ArticleDetailsView, window.articleService);
