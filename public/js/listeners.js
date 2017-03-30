'use strict';

var pagination = (function () {
    var TOTAL; // всего статей
    var PER_PAGE = 3; // статей на 1-ой странице
    var CURRENT_PAGE = 1; // текущая страница
    var SHOW_MORE_BUTTON;
    var SHOW_MORE_CALLBACK; // функция, которую вызывать, когда произошел клик по кнопке


    function init(total, showMoreCb) {
        TOTAL = total;
        SHOW_MORE_CALLBACK = showMoreCb;
        SHOW_MORE_BUTTON = document.getElementById('pagination-button');
        SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick);

        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        return getParams();
    }

    function handleShowMoreClick() {
        var paginationParams = nextPage();
        SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top);
        articleRenderer.renderFilter(shownArticles);
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

var showFullArticle = (function () {
    var TEMPLATE_ARTICLE_CONTENT;
    var NEWS_GRID;

    function init() {
        NEWS_GRID = document.querySelector('#newsGrid');
        TEMPLATE_ARTICLE_CONTENT = document.querySelector('#template-article-content');
        NEWS_GRID.addEventListener('click', handleShowContentClick);
    }

    function handleShowContentClick(event) {
        if (event.target.tagName != 'H3')
            return;
        var currentArticle = event.target.parentNode;
        NEWS_GRID.innerHTML = "";
        NEWS_GRID.appendChild(renderContent(currentArticle));
    }

    function renderContent(article) {
        var temp = TEMPLATE_ARTICLE_CONTENT;
        var articleContent = articlesService.getArticle(article.dataset.id).content;
        temp.content.querySelector('.article-content').textContent = articleContent;
        return temp.content.querySelector('.article-content').cloneNode(true);
    }

    return {
        init: init
    }
}());

document.addEventListener('DOMContentLoaded', startApp);

function startApp () {
    pagination.init(18, renderArticles);
    showFullArticle.init();
    articleRenderer.renderFilter(shownArticles);
}