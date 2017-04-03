;!function(DOMService, pagination, filter, showFull) {

    let edit = {};

    let NEWS_GRID;
    let TEMPLATE_EDIT_ARTICLE;
    let CURRENT_ARTICLE;

    edit.init = (curArticle) => {
        CURRENT_ARTICLE = curArticle;
        NEWS_GRID = document.querySelector('.news-grid');
        TEMPLATE_EDIT_ARTICLE = document.querySelector('#template-edit-article');
    };

    edit.handleEditArticle = () => {
        NEWS_GRID.innerHTML = "";
        NEWS_GRID.appendChild(TEMPLATE_EDIT_ARTICLE.content.querySelector('.edit-article').cloneNode(true));
        let submit = document.querySelector('.edit');
        submit.addEventListener('click', handleSubmitEditing);
    };

    function handleSubmitEditing() {
        let form = document.forms['edit-article-form'];
        let article = {};
        article.title = form.elements['title'].value;
        article.content = form.elements['content'].value;
        article.summary = form.elements['summary'].value;
        editArticle(CURRENT_ARTICLE.dataset.id, article);
        NEWS_GRID.innerHTML = "";
        DOMService.insertArticlesInDOM(shownArticles);
        pagination.showHide.show();
        filter.showHide.show();
    }

    window.edit = edit;
}(window.DOMService, window.pagination, window.filter, window.showFull);