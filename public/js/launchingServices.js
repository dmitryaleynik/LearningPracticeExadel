'use strict';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
	DOMService.init();
	DOMService.renderFilter(articleService.getArticlesFromDb());
}