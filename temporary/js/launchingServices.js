'use strict';


document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
	DOMService.init();
    articleService.getArticlesFromDb().then(articles => {
    	DOMService.renderFilter(articles);
    });
}
