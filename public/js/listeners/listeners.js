"use strict";



document.addEventListener('DOMContentLoaded', startApp);

function startApp () {

    pagination.init(articleService.getLength(), renderArticles);
    showFull.init();
    user.init();
    addNew.init();
    remove.init();
    filter.init();
}