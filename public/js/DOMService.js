;!function(articleService) {
    "use strict";

    let DOMService = {};

    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;
    let FILTER_SECTION;
    let FILTER_TEMPLATE;
    let USER_BUTTON;


        DOMService.init = () => {
            ARTICLE_TEMPLATE = document.querySelector('#template-article-grid-item');
            ARTICLE_LIST_NODE = document.querySelector('.news-grid');
            FILTER_SECTION = document.querySelector('#filter');
            FILTER_TEMPLATE = document.querySelector('#filter-item-template');
            USER_BUTTON = document.querySelector('#user-button');
        };

        DOMService.insertArticlesInDOM = (articles) => {
            let articlesNodes = renderArticles(articles);
            articlesNodes.forEach(function (node) {
                ARTICLE_LIST_NODE.appendChild(node);
            });
        };

        function renderArticles(articles) {
            return articles.map(function (article) {
                return renderArticle(article);
            })
        }

        function renderArticle (article) {
            let template = ARTICLE_TEMPLATE;
            template.content.querySelector('.article-grid-item').dataset.id = article.id;
            template.content.querySelector('.article-grid-item-title').textContent = article.title;
            template.content.querySelector('.article-grid-item-summary').textContent = article.summary;
            template.content.querySelector('.article-grid-item-author').textContent = article.author;
            template.content.querySelector('.article-grid-item-date').textContent = formatDate(article.createdAt);
            return template.content.querySelector('.article-grid-item').cloneNode(true);
        }

        function formatDate(d) {
            let hours = d.getHours();
            if(+hours <= 9) hours = '0' + hours;
            let minutes = d.getMinutes();
            if (+minutes <= 9) minutes = '0' + minutes;
            return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
                hours + ':' + minutes;
        }

        DOMService.renderUser = (user) => {
            USER_BUTTON.textContent = user;
        };


        DOMService.removeArticlesFromDOM = () => {
            ARTICLE_LIST_NODE.innerHTML = '';
        };

        DOMService.renderFilter = (articles) => {
            FILTER_SECTION.innerHTML = "";
            let set = new Set(articles.map(function(item) {
                return item.author;
            }));
            let filterItems = renderFilterItems(set);
            filterItems.forEach(function(item) {
                FILTER_SECTION.appendChild(item);
            });
            console.log()
        };

        function renderFilterItems(set) {
            let tSet = [];
            tSet.push("");
            set.forEach(function(item){
                tSet.push(item);
            });
            return tSet.map((item) => {
                let temp = FILTER_TEMPLATE;
                temp.content.querySelector('#filter-item').setAttribute('value', item);
                temp.content.querySelector('#filter-item').textContent = item;
                if (!item)
                    temp.content.querySelector('#filter-item').selected = true;
                return temp.content.querySelector('#filter-item').cloneNode(true);
            });
        }

    window.DOMService = DOMService;
}(window.articleService);