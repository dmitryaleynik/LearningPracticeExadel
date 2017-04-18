!function(servicesInteraction, articleService, pagination) {
	'use strict';

	const filter = {};

	let FILTER_SECTION;
	let NEWS_GRID;

	filter.init = () => {
		NEWS_GRID = document.querySelector('.news-grid');
		FILTER_SECTION = document.getElementById('filter');
		FILTER_SECTION.addEventListener('change', handleFilterChange);
	};

	const handleFilterChange = () => {
		const filt = FILTER_SECTION.value;
		NEWS_GRID.innerHTML = '';
		servicesInteraction.shownArticles = [];
		if (filt)
			pagination.init(articleService.getArticles(0, articleService.getMaxId(), {author: filt}).length,
                servicesInteraction.renderArticles, {author: filt});
		else
            pagination.init(articleService.getMaxId(), servicesInteraction.renderArticles);
	};

	filter.showHide = {};

	filter.showHide.show = () => {
		return FILTER_SECTION.parentNode.parentNode.hidden = false;
	};

	filter.showHide.hide = () => {
		return FILTER_SECTION.parentNode.parentNode.hidden = true;
	};


	window.filter = filter;
}(window.servicesInteraction, window.articleService, window.pagination);

