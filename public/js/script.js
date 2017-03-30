'use strict';
var articlesService = (function() {
	var articles = articles11;


	function compareArticles(a, b) {
		return (a.createdAt < b.createdAt) ? 1 : -1;
	}

	function sortByDate(articles) {
		return articles.sort(compareArticles);
	}

	function getArticles(skip, top, obj) {
		var subarticles = [];
		if (obj)
			subarticles = articles.filter(function(item){
				return item.author == obj.author;
			});
		else
			subarticles = articles.slice(0, articles.length);
		var sskip = skip||0;
		var ttop = top||9;
		var sortedSubarticles = sortByDate(subarticles);
		sortedSubarticles = sortedSubarticles.slice(sskip, sskip+ttop);
		return sortedSubarticles;
	}

	function getArticle(id) {
		if (isNaN(+id)) {
			console.log('Your id is invalid.');
			return false;
		}
		var temp = articles.find(function(item){
			return item.id == id;
		});
		if(!temp)
			console.log('Such article doesn\'t exist.');
		return temp;
	}

	function validateArticle(article, mode) {
		if (mode) {
			if (Object.keys(article).length != 6)
				return false;
			var a = Number(article.id);
			if (isNaN(a))
				return false;
			if (typeof article.title != 'string' || article.title.length >= 100)
				return false;
			if (typeof article.summary != 'string' || article.summary.length >= 200)
				return false;
			if (!article.createdAt instanceof Date)
				return false;
			if (typeof article.author != 'string')
				return false;
			if (typeof article.content != 'string')
				return false;
			return true;
		}
		else {
			if (article.title == undefined && article.summary == undefined && article.content == undefined)
				return false;
			if (article.title != undefined) {
				if (typeof article.title != 'string')
					return false;
				else if (article.title.length >= 100)
					return false;
			}
			if (article.summary != undefined) {
				if (typeof article.summary != 'string')
					return false;
				else if (article.summary.length >= 200)
					return false;
			}
			if (article.content != undefined) {
				if (article.content != 'string')
					return false;
			}
			return true;
		}
	}

	function addArticle(article) {
		if (!validateArticle(article, true))
			return false;
		if(articles.find(function (item) {
				return item.id == article.id;
            }))
			return false;
		articles.push(article);
		return true;
	}

	function editArticle(id, article) {
		if (!validateArticle(article, false))
			return false;
		for (var i = 0; i < articles.length; ++i) {
			if (articles[i].id == id) {
				if (article.title != undefined)
					articles[i].title = article.title;
				if (article.summary != undefined)
					articles[i].summary = article.summary;
				if (article.content != undefined)
					articles[i].content = article.content;
				return true;
			}
		}
		return false;
	}

	function removeArticle(id) {
		if (isNaN(+id)) {
			console.log('Your id is invalid.');
			return false;
		}
		for (var i = 0; i < articles.length; ++i)
			if (articles[i].id == id) {
				articles.splice(i, 1);
				return true;
			}
		return false;
	}
	return {
		sortByDate: sortByDate,
		getArticles: getArticles,
		getArticle: getArticle,
		validateArticle: validateArticle,
		addArticle: addArticle,
		editArticle: editArticle,
		removeArticle: removeArticle
	};
}());

var articleRenderer = (function() {
	var ARTICLE_TEMPLATE;
	var ARTICLE_LIST_NODE;
	var FILTER_SECTION;
	var FILTER_TEMPLATE;
	var AUTHORIZE_SECTION;

	function init() {
		ARTICLE_TEMPLATE = document.querySelector('#template-article-grid-item');
		ARTICLE_LIST_NODE = document.querySelector('.news-grid');
		FILTER_SECTION = document.querySelector('#filter-section');
		FILTER_TEMPLATE = document.querySelector('#filter-item-template');
		AUTHORIZE_SECTION = document.querySelector('#authorize');
	}

	function insertArticlesInDOM(articles) {
		var articlesNodes = renderArticles(articles);
		articlesNodes.forEach(function (node) {
			ARTICLE_LIST_NODE.appendChild(node);
        });
	}

	function renderUser(user) {
		AUTHORIZE_SECTION.textContent = user;
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
	}

	function renderFilterItems(set) {
		var tSet = [];
		set.forEach(function(item){
			tSet.push(item);
		});
		return tSet.map(function (item){
			var temp = FILTER_TEMPLATE;
			temp.content.querySelector('#filter-item').setAttribute('value', item);
			temp.content.querySelector('#filter-item').textContent = item;
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
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
            d.getHours() + ':' + d.getMinutes();
    }

    return {
		init: init,
		insertArticlesInDOM: insertArticlesInDOM,
		removeArticlesFromDOM: removeArticlesFromDOM,
		renderUser: renderUser,
		renderFilter: renderFilter
	};
}());

document.addEventListener('DOMContentLoaded', startApp);

var shownArticles = [];
var currentPaginationArticles = [];
var user = "Oleg Olegov";

function startApp() {
	articleRenderer.init();
	renderArticles(0, 3);
	articleRenderer.renderUser(user);
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
