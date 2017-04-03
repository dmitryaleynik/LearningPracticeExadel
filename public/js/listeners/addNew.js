;!function (articleService, DOMService, pagination, filter, user) {

    let addNew = {};

    let NEWS_GRID;
    let TEMPLATE_NEW_ARTICLE;
    let ADD_BUTTON;

    addNew.init = () => {
        NEWS_GRID = document.querySelector('.news-grid');
        TEMPLATE_NEW_ARTICLE = document.querySelector('#template-new-article');
        ADD_BUTTON = document.querySelector('#add-new-article-button');
        ADD_BUTTON.addEventListener('click', handleAddNewArticle);
    };

    function handleAddNewArticle() {
        user.hideUserForm();
        pagination.showHide.hide();
        filter.showHide.hide();
        NEWS_GRID.innerHTML = "";
        NEWS_GRID.appendChild(TEMPLATE_NEW_ARTICLE.content.querySelector('.new-article').cloneNode(true));
        let submit = document.querySelector('.add');
        submit.addEventListener('click', handleSubmitAdding);
    }

    function handleSubmitAdding () {
        let form = document.forms['new-article-form'];
        let article = {};
        article.id = (articleService.getMaxId() + 1).toString();
        article.title = form.elements['title'].value;
        article.summary = form.elements['summary'].value;
        article.createdAt = new Date(form.elements['date'].value);
        article.author = form.elements['author'].value;
        article.content = form.elements['content'].value;

        addArticle(article);

        NEWS_GRID.innerHTML = "";
        DOMService.insertArticlesInDOM(shownArticles);
        DOMService.renderFilter(shownArticles);
        pagination.showHide.show();
        filter.showHide.show();
    }

    window.addNew = addNew;
}(window.articleService, window.DOMService, window.pagination, window.filter, window.user);