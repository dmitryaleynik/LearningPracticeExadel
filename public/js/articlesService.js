'use strict';

var articlesService = (function() {
	var articles = articles11;

	function extendedParse(key, value) {
		if(key === 'createdAt')
			return new Date(value);
		return value;
	}

	function getLength() {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		return articles.length;
	}

	function getMaxId() {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		return +articles[articles.length-1].id;
	}

	function compareArticles(a, b) {
		return (a.createdAt < b.createdAt) ? 1 : -1;
	}

	function sortByDate(articles) {
		return articles.sort(compareArticles);
	}

	function getArticles(skip, top, obj) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		articles.forEach(function(item) {
			item.createdAt = new Date(item.createdAt);
		});
		var subarticles = [];
		if (obj)
			subarticles = articles.filter(function(item){
				return item.author === obj.author;
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
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		articles.forEach(function(item) {
			item.createdAt = new Date(item.createdAt);
		});
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
				if (typeof article.content != 'string')
					return false;
			}
			return true;
		}
	}

	function addArticle(article) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		if (!validateArticle(article, true))
			return false;
		if(articles.find(function (item) {
				return item.id == article.id;
			}))
			return false;
		articles.push(article);
		localStorage.setItem('articles', JSON.stringify(articles));
		return true;
	}

	function editArticle(id, article) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		if (!validateArticle(article, false))
			return false;
		for (var i = 0; i < articles.length; ++i) {
			if (articles[i].id == id) {
				if (article.title != "")
					articles[i].title = article.title;
				if (article.summary != "")
					articles[i].summary = article.summary;
				if (article.content != "")
					articles[i].content = article.content;
				localStorage.setItem('articles', JSON.stringify(articles));
				return true;
			}
		}
		return false;
	}

	function removeArticle(id) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		if (isNaN(+id)) {
			console.log('Your id is invalid.');
			return false;
		}
		for (var i = 0; i < articles.length; ++i)
			if (articles[i].id == id) {
				articles.splice(i, 1);
				localStorage.setItem('articles', JSON.stringify(articles));
				return true;
			}
		return false;
	}
	return {
		getLength: getLength,
		getMaxId: getMaxId,
		sortByDate: sortByDate,
		getArticles: getArticles,
		getArticle: getArticle,
		validateArticle: validateArticle,
		addArticle: addArticle,
		editArticle: editArticle,
		removeArticle: removeArticle
	};
}());