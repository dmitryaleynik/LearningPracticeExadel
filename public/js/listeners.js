'use strict';

var pagination = (function () {
    var TOTAL; // всего статей
    var PER_PAGE = 3; // статей на 1-ой странице
    var CURRENT_PAGE; // текущая страница
    var SHOW_MORE_BUTTON;
    var FILTER;
    var SHOW_MORE_CALLBACK; // функция, которую вызывать, когда произошел клик по кнопке

    function init(total, showMoreCb, filter) {
        TOTAL = total;
        FILTER = filter;
        CURRENT_PAGE = 1;
        SHOW_MORE_CALLBACK = showMoreCb;
        SHOW_MORE_BUTTON = document.getElementById('pagination-button');
        SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick);
        SHOW_MORE_CALLBACK(0, 3, FILTER);
        SHOW_MORE_BUTTON.hidden = false;
        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        return getParams();
    }

    function handleShowMoreClick() {
        var paginationParams = nextPage();
        SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top, FILTER);
    }

    function getTotalPages() {
        return Math.ceil(TOTAL / PER_PAGE);
    }

    function nextPage() {
        CURRENT_PAGE++;
        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        return getParams();
    }

    function getParams() {
        return {
            top: PER_PAGE,
            skip: (CURRENT_PAGE - 1) * PER_PAGE
        };
    }

    function hideShowMoreButton() {
        SHOW_MORE_BUTTON.hidden = true;
    }

    return {
        init: init
    }
}());

var filter = (function() {
    var FILTER_SECTION;
    var NEWS_GRID;
    function init() {
        NEWS_GRID = document.querySelector('#newsGrid');
        FILTER_SECTION = document.querySelector("#filter-section");
        FILTER_SECTION.addEventListener('change', handleFilterChange);
    }

    function handleFilterChange() {
        var filt = FILTER_SECTION.value;
        NEWS_GRID.innerHTML = "";
        shownArticles = [];
        if (filt)
            pagination.init(articlesService.getArticles(0, articlesService.getMaxId(), {author: filt}).length,
                renderArticles, {author: filt});
        else
            pagination.init(articlesService.getMaxId(), renderArticles);
    }

    return {
        init: init
    }
}());

var showFullArticle = (function () {
    var TEMPLATE_ARTICLE_CONTENT;
    var NEWS_GRID;
    var BACK_BUTTON;
    var CURRENT_ARTICLE;
    var REMOVED_ARTICLE;

    function init() {
        editCurrentArticle.init();
        NEWS_GRID = document.querySelector('#newsGrid');
        TEMPLATE_ARTICLE_CONTENT = document.querySelector('#template-article-content');
        NEWS_GRID.addEventListener('click', handleShowContentClick);
        NEWS_GRID.addEventListener('click', handleRemoveClick);
    }

    function handleRemoveClick(event) {
        if (!event.target.matches('.remove'))
            return;
        REMOVED_ARTICLE = event.target.parentNode;
        removeArticle(REMOVED_ARTICLE.dataset.id);
        NEWS_GRID.innerHTML = "";
        pagination.init(articlesService.getLength(), renderArticles);
    }

    function handleShowContentClick(event) {
        if (event.target.tagName != 'H3')
            return;
        CURRENT_ARTICLE = event.target.parentNode;
        NEWS_GRID.innerHTML = "";
        NEWS_GRID.appendChild(renderContent(CURRENT_ARTICLE));
        BACK_BUTTON = document.querySelector('#back-to-grid');
        editCurrentArticle.EDIT_BUTTON = document.querySelector('#edit');
        editCurrentArticle.EDIT_BUTTON.addEventListener('click', editCurrentArticle.handleEditArticle);
        BACK_BUTTON.addEventListener('click', handleBackClick);
    }

    function renderContent(article) {
        var temp = TEMPLATE_ARTICLE_CONTENT;
        var articleContent = articlesService.getArticle(article.dataset.id).content;
        temp.content.querySelector('#inner-content').textContent = articleContent;
        return temp.content.querySelector('.article-content').cloneNode(true);
    }

    function handleBackClick() {
        NEWS_GRID.innerHTML = "";
        articleRenderer.insertArticlesInDOM(shownArticles);
    }

    var editCurrentArticle = (function(){
        var TEMPLATE_EDIT_ARTICLE;

        function init() {
            TEMPLATE_EDIT_ARTICLE = document.querySelector('#template-edit-article');
        }

        function handleEditArticle() {
            NEWS_GRID.innerHTML = "";
            NEWS_GRID.appendChild(TEMPLATE_EDIT_ARTICLE.content.querySelector('.edit-article').cloneNode(true));
            var submit = document.querySelector('.submit');
            submit.addEventListener('click', handleSubmitEditing);
        }

        function handleSubmitEditing() {
            var form = document.forms['edit-article-form'];
            var article = {};
            article.title = form.elements['title'].value;
            article.content = form.elements['content'].value;
            article.summary = form.elements['summary'].value;
            editArticle(CURRENT_ARTICLE.dataset.id, article);
            NEWS_GRID.innerHTML = "";
            articleRenderer.insertArticlesInDOM(shownArticles);
        }

        return {
            init: init,
            handleEditArticle: handleEditArticle
        }
    }());

    return {
        init: init
    }
}());

var newArticle = (function () {
    var NEWS_GRID;
    var TEMPLATE_NEW_ARTICLE;
    var ADD_BUTTON;

    function init() {
        NEWS_GRID = document.querySelector('#newsGrid');
        TEMPLATE_NEW_ARTICLE = document.querySelector('#template-new-article');
        ADD_BUTTON = document.querySelector('#add');
        ADD_BUTTON.addEventListener('click', handleAddNewArticle);
    }

    function handleAddNewArticle() {
        NEWS_GRID.innerHTML = "";
        NEWS_GRID.appendChild(TEMPLATE_NEW_ARTICLE.content.querySelector('.new-article').cloneNode(true));
        var submit = document.querySelector('.submit');
        submit.addEventListener('click', handleSubmitAdding);
    }

    function handleSubmitAdding () {
        var form = document.forms['new-article-form'];
        var article = {};
        article.id = articlesService.getMaxId() + 1;
        article.title = form.elements['title'].value;
        article.summary = form.elements['summary'].value;
        article.createdAt = new Date(form.elements['date'].value);
        article.author = form.elements['author'].value;
        article.content = form.elements['content'].value;

        addArticle(article);

        NEWS_GRID.innerHTML = "";
        articleRenderer.insertArticlesInDOM(shownArticles);
        articleRenderer.renderFilter(shownArticles);
    }

    return {
        init: init
    }

}());

var authorize = (function(){
    var AUTHORIZE_BUTTON;
    var AUTHORIZE_WINDOW;
    var AUTHORIZE_FORM;
    var LOGIN_BUTTON;
    var LOGOUT_BUTTON;

    function init() {
        AUTHORIZE_BUTTON = document.querySelector('#authorize');
        AUTHORIZE_WINDOW = document.querySelector('.authorize-form');
        LOGIN_BUTTON = document.querySelector('#login');
        LOGOUT_BUTTON = document.querySelector('#logout');
        AUTHORIZE_FORM = document.forms['authorize'];
        AUTHORIZE_WINDOW.hidden = true;
        if (localStorage.getItem('user')) {
            articleRenderer.renderUser(localStorage.getItem('user'));
            AUTHORIZE_FORM.hidden = true;
        }
        else
            LOGOUT_BUTTON.hidden = true;
        AUTHORIZE_BUTTON.addEventListener('click', handleAuthorizeFormShowing);
        LOGIN_BUTTON.addEventListener('click', handleSubmitLoggingIn);
        LOGOUT_BUTTON.addEventListener('click', handleLogout);
    }

    function handleAuthorizeFormShowing() {
        if (AUTHORIZE_WINDOW.hidden) {
            AUTHORIZE_WINDOW.hidden = false;
        } else {
            AUTHORIZE_WINDOW.hidden = true;
        }
    }

    function handleSubmitLoggingIn() {
        var user = AUTHORIZE_FORM.elements[0].value;
        if (user) {
            localStorage.setItem('user', user);
            articleRenderer.renderUser(user);
            AUTHORIZE_WINDOW.hidden = true;
            AUTHORIZE_FORM.hidden = true;
            LOGOUT_BUTTON.hidden = false;
        }
    }

    function handleLogout() {
        var user = "";
        localStorage.removeItem('user');
        articleRenderer.renderUser('name');
        LOGOUT_BUTTON.hidden = true;
        AUTHORIZE_WINDOW.hidden = true;
        AUTHORIZE_FORM.hidden = false;
    }

    return {
        init: init
    }

}());


document.addEventListener('DOMContentLoaded', startApp);

function startApp () {

    pagination.init(articlesService.getLength(), renderArticles);
    showFullArticle.init();
    newArticle.init();
    showFullArticle.init();
    filter.init();
    authorize.init();
}
