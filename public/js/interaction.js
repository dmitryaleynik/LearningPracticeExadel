document.addEventListener('DOMContentLoaded', startApp);

var shownArticles = [];
var currentPaginationArticles = [];

function startApp() {
    articleRenderer.init();
    articleRenderer.renderFilter(JSON.parse(localStorage.getItem('articles')));
}

function renderArticles(skip, top, obj) {
    currentPaginationArticles = articlesService.getArticles(skip, top, obj);
    currentPaginationArticles.forEach(function (item) {
        shownArticles.push(item);
    });
    articleRenderer.insertArticlesInDOM(currentPaginationArticles);
}

function addArticle (article) {
    if (articlesService.addArticle(article)) {
        shownArticles.push(article);
        articlesService.sortByDate(shownArticles);
        articleRenderer.removeArticlesFromDOM();
        articleRenderer.insertArticlesInDOM(shownArticles);
    }
}

function removeArticle(id) {
    if (articlesService.removeArticle(id)) {
        var temp = shownArticles.find(function (elem) {
            return elem.id == id;
        });
        if (temp) {
            shownArticles.splice(shownArticles.indexOf(temp), 1);
            articleRenderer.removeArticlesFromDOM();
            articleRenderer.insertArticlesInDOM(shownArticles);
        }
    }
}

function editArticle(id, obj) {
    if (articlesService.editArticle(id, obj)) {
        var newArticle = articlesService.getArticle(id);
        var oldArticle = shownArticles.find(function(item){
            return item.id == id;
        });
        if (oldArticle) {
            shownArticles.splice(shownArticles.indexOf(oldArticle), 1);
            shownArticles.push(newArticle);
            articlesService.sortByDate(shownArticles);
            articleRenderer.removeArticlesFromDOM();
            articleRenderer.insertArticlesInDOM(shownArticles);
        }
    }
}