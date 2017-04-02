;!function (articleService, DOMService, pagination, filter, edit) {

    let showFull = {};

    let TEMPLATE_ARTICLE_CONTENT;
    let NEWS_GRID;
    let BACK_BUTTON;
    let CURRENT_ARTICLE;

    showFull.init = () => {
        edit.init();
        NEWS_GRID = document.querySelector('.news-grid');
        TEMPLATE_ARTICLE_CONTENT = document.querySelector('#template-article-content');
        NEWS_GRID.addEventListener('click', handleShowContentClick);
    };

    function handleShowContentClick(event) {
        if (event.target.tagName !== 'H3')
            return;
        pagination.showHide.hide();
        filter.showHide.hide();
        CURRENT_ARTICLE = event.target.parentNode.parentNode;
        NEWS_GRID.innerHTML = "";
        NEWS_GRID.appendChild(renderContent(CURRENT_ARTICLE));
        BACK_BUTTON = document.querySelector('#back-button');
        edit.EDIT_BUTTON = document.querySelector('#edit-button');
        edit.EDIT_BUTTON.addEventListener('click', edit.handleEditArticle);
        BACK_BUTTON.addEventListener('click', handleBackClick);
    }

    function renderContent(article) {
        let temp = TEMPLATE_ARTICLE_CONTENT;
        temp.content.querySelector('.full-content').textContent =
            articleService.getArticle(article.dataset.id).content;
        return temp.content.querySelector('.article-content').cloneNode(true);
    }

    function handleBackClick() {
        NEWS_GRID.innerHTML = "";
        DOMService.insertArticlesInDOM(shownArticles);
        pagination.showHide.show();
        filter.showHide.show();
    }






    window.showFull = showFull;
}(window.articleService, window.DOMService, window.pagination, window.filter, window.edit);