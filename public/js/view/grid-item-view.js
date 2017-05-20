;!function () {
    'use strict';

    class GridItemView {

        constructor(article) {
            this.article = article;
        }

        render() {
            let view = '<div class=\"article-grid-item-inside\">' +
                '<h3 class=\"article-grid-item-title\" data-purpose=\"details\">'
                + this.article.title + '</h3>' +
                '<p class=\"article-grid-item-summary\">' + this.article.summary + '</p>' +
                '<hr>' +
                '<div class=\"article-grid-item-footer\">' +
                '<span>Author: <span class=\"article-grid-item-author\">' +
                this.article.author + '</span></span>' +
                '<span>Posted at: <span class=\"article-grid-item-date\">' +
                this.formatDate(this.article.createdAt) + '</span></span></div>' +
                '<div id=\"remove-button\" data-purpose=\"remove\" class=\"buttons\">X</div></div>';

            let item = document.createElement('section');
            item.className = 'article-grid-item col-lg-4 col-md-6';
            item.dataset.id = this.article._id;
            item.innerHTML = view;

            return item;
        }

        formatDate(d) {
            let hours = d.getHours();
            if(+hours <= 9) hours = `0${hours}`;
            let minutes = d.getMinutes();
            if (+minutes <= 9) minutes = `0${minutes}`;
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${
                hours}:${minutes}`;
        }

    }

    window.GridItemView = GridItemView;
}();
