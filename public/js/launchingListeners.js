'use strict';


document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
	articleService.getLength().then (length => {
		pagination.init(length, servicesInteraction.renderArticles);
	});
	showFull.init();
	user.init();
	addNew.init();
	remove.init(user.getCurrentUser());
	filter.init();
}