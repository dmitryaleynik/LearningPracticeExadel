;!function(ArticleDetailsView, articleService) {
    "use strict";

    class ArticleDetailsInitialization {

        init() {
            let curArticle = event.target.parentNode.parentNode;
            articleService.getArticle(curArticle.dataset.id).then (article => {
                let grid = new ArticleDetailsView(article).render();
              showable.edit = document.querySelector('#edit-button');
              if (curUser === "") {
                showable.edit.hidden = true;
                document.querySelector('#back-button').style.position = 'relative';
              } else {
                showable.edit.hidden = false;
                document.querySelector('#back-button').style.position = 'absolute';
              }
            });
            return curArticle;
        }
    }

    window.ArticleDetailsInitialization = ArticleDetailsInitialization;
}(window.ArticleDetailsView, window.articleService);
