;!function (articleService, DOMService){

    let remove = {};

    let NEWS_GRID;
    let REMOVED_ARTICLE;

    remove.init = () => {
        NEWS_GRID = document.querySelector('.news-grid');
        NEWS_GRID.addEventListener('click', handleRemoveArticle)
    };

    function handleRemoveArticle(event) {
        if (!event.target.matches('#remove-button'))
            return;
        REMOVED_ARTICLE = event.target.parentNode.parentNode;
        removeArticle(REMOVED_ARTICLE.dataset.id);
        DOMService.renderFilter(articleService.getArticlesFromDb());
        NEWS_GRID.innerHTML = "";
        DOMService.insertArticlesInDOM(shownArticles);
    }

    window.remove = remove;
}(window.articleService, window.DOMService);