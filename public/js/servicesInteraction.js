!function (articleService, DOMService) {

	let servicesInteraction = {};

	servicesInteraction.shownArticles = [];
	servicesInteraction.currentPaginationArticles = [];


	servicesInteraction.renderArticles = (skip, top, obj) => {
		servicesInteraction.currentPaginationArticles = articleService.getArticles(skip, top, obj);
		servicesInteraction.currentPaginationArticles.forEach(function (item) {
			servicesInteraction.shownArticles.push(item);
		});
		DOMService.insertArticlesInDOM(servicesInteraction.currentPaginationArticles);
	};

	servicesInteraction.addArticle = (article) => {
		if (articleService.addArticle(article)) {
			servicesInteraction.shownArticles.push(article);
			articleService.sortByDate(servicesInteraction.shownArticles);
			DOMService.removeArticlesFromDOM();
			DOMService.insertArticlesInDOM(servicesInteraction.shownArticles);
		}
	};

	servicesInteraction.removeArticle = (id) => {
		if (articleService.removeArticle(id)) {
			let temp = servicesInteraction.shownArticles.find((elem) => {
				return elem.id === id;
			});
			if (temp) {
				servicesInteraction.shownArticles.splice(servicesInteraction.shownArticles.indexOf(temp), 1);
				DOMService.removeArticlesFromDOM();
				DOMService.insertArticlesInDOM(servicesInteraction.shownArticles);
			}
		}
	};

	servicesInteraction. editArticle = (id, obj) => {
		if (articleService.editArticle(id, obj)) {
			let newArticle = articlesService.getArticle(id);
			let oldArticle = servicesInteraction.shownArticles.find((item) => {
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