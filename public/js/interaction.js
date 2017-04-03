document.addEventListener('DOMContentLoaded', startApp);

let shownArticles = [];
let currentPaginationArticles = [];


function renderArticles(skip, top, obj) {
    currentPaginationArticles = articleService.getArticles(skip, top, obj);
    currentPaginationArticles.forEach(function (item) {
        shownArticles.push(item);
    });
    DOMService.insertArticlesInDOM(currentPaginationArticles);
}

function addArticle (article) {
    if (articleService.addArticle(article)) {
        shownArticles.push(article);
        articleService.sortByDate(shownArticles);
        DOMService.removeArticlesFromDOM();
        DOMService.insertArticlesInDOM(shownArticles);
    }
}

function removeArticle(id) {
    if (articleService.removeArticle(id)) {
        let temp = shownArticles.find((elem) => {
            return elem.id === id;
        });
        if (temp) {
            shownArticles.splice(shownArticles.indexOf(temp), 1);
            DOMService.removeArticlesFromDOM();
            DOMService.insertArticlesInDOM(shownArticles);
        }
    }
}

function editArticle(id, obj) {
    if (articleService.editArticle(id, obj)) {
        let newArticle = articlesService.getArticle(id);
        let oldArticle = shownArticles.find((item) => { return item.id === id; });
        if (oldArticle) {
            shownArticles.splice(shownArticles.indexOf(oldArticle), 1);
            shownArticles.push(newArticle);
            articleService.sortByDate(shownArticles);
            DOMService.removeArticlesFromDOM();
            DOMService.insertArticlesInDOM(shownArticles);
        }
    }
}