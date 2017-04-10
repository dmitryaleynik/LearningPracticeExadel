'use strict';


document.addEventListener('DOMContentLoaded', startApp);

function startApp () {

	pagination.init(articleService.getLength(), servicesInteraction.renderArticles);
	showFull.init();
	user.init();
	addNew.init();
	remove.init(user.getCurrentUser());
	filter.init();
}