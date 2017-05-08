;!function(articleService) {
    "use strict";

    class PaginationInitialization {

        constructor(articles) {
            this.articles = articles;
            this.curPage = 1;
            this.total = articles.length;
            this.top = 3;
            if (this.getTotalPages() <= this.curPage)
                document.querySelector('#pagination-button').hidden = true;
            else
                document.querySelector('#pagination-button').hidden = false;
        }

        showMore() {
            const top = this.nextPage();
            return articleService.getArticles(top);
        }

        nextPage() {
            this.curPage++;
            if (this.getTotalPages() <= this.curPage)
                document.querySelector('#pagination-button').hidden = true;
            return this.top += 3;
        };


        getTotalPages() {
            return Math.ceil(this.total / 3);
        }
    }


    window.PaginationInitialization = PaginationInitialization;
}(window.articleService);