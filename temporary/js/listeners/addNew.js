!function (servicesInteraction, articleService, DOMService, pagination, filter, user) {
	'use strict';

	const addNew = {};

	let NEWS_GRID;
	let TEMPLATE_NEW_ARTICLE;
	let ADD_BUTTON;

	addNew.init = () => {
		NEWS_GRID = document.querySelector('.news-grid');
		TEMPLATE_NEW_ARTICLE = document.querySelector('#template-new-article.js');
		ADD_BUTTON = document.querySelector('#add-new-article.js-button');
		ADD_BUTTON.addEventListener('click', handleAddNewArticle);
	};

	const handleAddNewArticle = () => {
		user.hideUserForm();
		pagination.showHide.hide();
		filter.showHide.hide();
		NEWS_GRID.innerHTML = '';
		NEWS_GRID.appendChild(TEMPLATE_NEW_ARTICLE.content.querySelector('.new-article.js').cloneNode(true));
		const submit = document.querySelector('.add');
		submit.addEventListener('click', handleSubmitAdding);
	};

	const handleSubmitAdding = () => {
		const form = document.forms['new-article.js-form'];
		const article = {};
		articleService.getMaxId().then (maxId => {

			article.id = (maxId + 1).toString();
			article.title = form.elements['title'].value;
			article.summary = form.elements['summary'].value;
			article.createdAt = new Date(form.elements['date'].value);
			article.author = user.getCurrentUser();
			article.content = form.elements['content'].value;

			servicesInteraction.addArticle(article);

			NEWS_GRID.innerHTML = '';
			DOMService.insertArticlesInDOM(servicesInteraction.shownArticles);
			DOMService.renderFilter(servicesInteraction.shownArticles);
			pagination.showHide.show();
			filter.showHide.show();
		})
	};

	window.addNew = addNew;
}(window.servicesInteraction, window.articleService, window.DOMService, window.pagination, window.filter, window.username);