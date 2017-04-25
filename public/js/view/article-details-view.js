;!function() {
    "use strict";

    class ArticleDetailsView {

        constructor(article) {
            this.article = article;
        }

        render() {
            let view = '<div class=\"article-content article-grid-item-inside\">' +
                '<div class=\"full-content\">' + this.article.content +
                '</div> <div id=\"edit-button" data-purpose=\"edit\" class=\"buttons\">edit</div>' +
                '<div id=\"back-button\" class=\"buttons\" data-purpose=\"back\">back</div> </div>';

            let div = document.querySelector('.news-grid');
            div.innerHTML = view;

            return div;
        }

    }

    window.ArticleDetailsView = ArticleDetailsView;
}();