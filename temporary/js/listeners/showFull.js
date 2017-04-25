!function (servicesInteraction, articleService, DOMService, pagination, filter, edit) {
	'use strict';

	const showFull = {};

	let TEMPLATE_ARTICLE_CONTENT;
	let NEWS_GRID;
	let BACK_BUTTON;
	let CURRENT_ARTICLE;

	showFull.init = () => {
		NEWS_GRID = document.querySelector('.news-grid');
		TEMPLATE_ARTICLE_CONTENT = document.querySelector('#template-article.js-content');
		NEWS_GRID.addEventListener('click', handleShowContentClick);
	};

	const handleShowContentClick = (event) => {
		if (event.target.tagName !== 'H3')
			return;
		pagination.showHide.hide();
		filter.showHide.hide();
		CURRENT_ARTICLE = event.target.parentNode.parentNode;
		edit.init(CURRENT_ARTICLE);
		NEWS_GRID.innerHTML = '';
		renderContent(CURRENT_ARTICLE).then(renderedAticle => {
            NEWS_GRID.appendChild(renderedAticle);
			BACK_BUTTON = document.querySelector('#back-button');
			edit.EDIT_BUTTON = document.querySelector('#edit-button');
			edit.EDIT_BUTTON.addEventListener('click', edit.handleEditArticle);
			BACK_BUTTON.addEventListener('click', handleBackClick);
		});
	};

	const renderContent = article => {
		return articleService.getArticle(article.dataset.id).then(receivedArticle => {
			const temp = TEMPLATE_ARTICLE_CONTENT;
            temp.content.querySelector('.full-content').textContent =
                receivedArticle.content;
			return temp.content.querySelector('.article.js-content').cloneNode(true);
        });
	};

	const handleBackClick = () => {
		NEWS_GRID.innerHTML = '';
		DOMService.insertArticlesInDOM(servicesInteraction.shownArticles);
		pagination.showHide.show();
		filter.showHide.show();
	};

	window.showFull = showFull;
}(window.servicesInteraction, window.articleService, window.DOMService, window.pagination, window.filter, window.edit);