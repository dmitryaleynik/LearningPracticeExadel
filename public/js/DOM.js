var articleRenderer = (function() {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;
    var FILTER_SECTION;
    var FILTER_TEMPLATE;
    var USER_BUTTON;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-grid-item');
        ARTICLE_LIST_NODE = document.querySelector('.news-grid');
        FILTER_SECTION = document.querySelector('#filter');
        FILTER_TEMPLATE = document.querySelector('#filter-item-template');
        USER_BUTTON = document.querySelector('#user-button');
    }

    function insertArticlesInDOM(articles) {
        var articlesNodes = renderArticles(articles);
        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function renderUser(user) {
        USER_BUTTON.textContent = user;
    }

    function removeArticlesFromDOM () {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderFilter(articles) {
        FILTER_SECTION.innerHTML = "";
        var set = new Set(articles.map(function(item) {
            return item.author;
        }));
        var filterItems = renderFilterItems(set);
        filterItems.forEach(function(item) {
            FILTER_SECTION.appendChild(item);
        });
        console.log()
    }

    function renderFilterItems(set) {
        var tSet = [];
        tSet.push("");
        set.forEach(function(item){
            tSet.push(item);
        });
        return tSet.map(function (item){
            var temp = FILTER_TEMPLATE;
            temp.content.querySelector('#filter-item').setAttribute('value', item);
            temp.content.querySelector('#filter-item').textContent = item;
            if (!item)
                temp.content.querySelector('#filter-item').selected = true;
            return temp.content.querySelector('#filter-item').cloneNode(true);
        });
    }

    function renderArticles(articles) {
        return articles.map(function (article) {
            return renderArticle(article);
        })
    }

    function renderArticle (article) {
        var template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-grid-item').dataset.id = article.id;
        template.content.querySelector('.article-grid-item-title').textContent = article.title;
        template.content.querySelector('.article-grid-item-summary').textContent = article.summary;
        template.content.querySelector('.article-grid-item-author').textContent = article.author;
        template.content.querySelector('.article-grid-item-date').textContent = formatDate(article.createdAt);
        return template.content.querySelector('.article-grid-item').cloneNode(true);
    }

    function formatDate(d) {
        var hours = d.getHours();
        if(+hours <= 9)
            hours = '0' + hours;
        var minutes = d.getMinutes();
        if (+minutes <= 9)
            minutes = '0' + minutes;
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
            hours + ':' + minutes;
    }

    return {
        init: init,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDOM: removeArticlesFromDOM,
        renderUser: renderUser,
        renderFilter: renderFilter
    };
}());