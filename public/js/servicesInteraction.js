!function (articleService, DOMService) {
	"use strict";

	const servicesInteraction = {};

	servicesInteraction.shownArticles = [];
	servicesInteraction.currentPaginationArticles = [];


	servicesInteraction.renderArticles = (skip, top, obj) => {
		let promise = articleService.getArticles(skip, top, obj);
		promise.then (articles => {
				servicesInteraction.currentPaginationArticles = articles;
				servicesInteraction.currentPaginationArticles.forEach(function (item) {
				servicesInteraction.shownArticles.push(item);
			});
			DOMService.insertArticlesInDOM(servicesInteraction.currentPaginationArticles);
		});
	};

	servicesInteraction.addArticle = article => {
		articleService.addArticle(article).then (() => {
			servicesInteraction.shownArticles.push(article);
			articleService.sortByDate(servicesInteraction.shownArticles);
			DOMService.removeArticlesFromDOM();
			DOMService.insertArticlesInDOM(servicesInteraction.shownArticles);
		});
	};

	servicesInteraction.removeArticle = (id) => {
		return articleService.removeArticle(id).then(articles => {
			const temp = servicesInteraction.shownArticles.find((elem) => {
				return elem.id === id;
			});
			if (temp) {
				servicesInteraction.shownArticles.splice(servicesInteraction.shownArticles.indexOf(temp), 1);
				DOMService.removeArticlesFromDOM();
				DOMService.insertArticlesInDOM(servicesInteraction.shownArticles);
				return articles;
			}
		});
	};

	servicesInteraction. editArticle = (id, obj) => {
		if (articleService.editArticle(id, obj)) {
			const newArticle = articlesService.getArticle(id);
			const oldArticle = servicesInteraction.shownArticles.find((item) => {
				return item.id === id;
			});
			if (oldArticle) {
				servicesInteraction.shownArticles.splice(servicesInteraction.shownArticles.indexOf(oldArticle), 1);
				servicesInteraction.shownArticles.push(newArticle);
				articleService.sortByDate(servicesInteraction.shownArticles);
				DOMService.removeArticlesFromDOM();
				DOMService.insertArticlesInDOM(servicesInteraction.shownArticles);
			}
		}
	};

	window.servicesInteraction = servicesInteraction;
}(window.articleService, window.DOMService);