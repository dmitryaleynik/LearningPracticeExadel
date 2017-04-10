!function (servicesInteraction, articleService, DOMService){
	'use strict';

	let remove = {};

	let NEWS_GRID;
	let REMOVED_ARTICLE;

	remove.init = (user) => {
		NEWS_GRID = document.querySelector('.news-grid');
		if (!user)
			remove.showHide.hide();
		NEWS_GRID.addEventListener('click', handleRemoveArticle);
	};

	function handleRemoveArticle(event) {
		if (!event.target.matches('#remove-button'))
			return;
		REMOVED_ARTICLE = event.target.parentNode.parentNode;
		servicesInteraction.removeArticle(REMOVED_ARTICLE.dataset.id);
		DOMService.renderFilter(articleService.getArticlesFromDb());
		NEWS_GRID.innerHTML = '';
		DOMService.insertArticlesInDOM(servicesInteraction.shownArticles);
	}

	remove.showHide = {};

	remove.showHide.hide = () => {
		let buttons = NEWS_GRID.querySelectorAll('#remove-button');
		return buttons.forEach((item) => {
			item.hidden = true;
        });
	};

	remove.showHide.show = () => {
        let buttons = NEWS_GRID.querySelectorAll('#remove-button');
        return buttons.forEach((item) => {
            item.hidden = false;
        });
	};

	window.remove = remove;
}(window.servicesInteraction, window.articleService, window.DOMService);