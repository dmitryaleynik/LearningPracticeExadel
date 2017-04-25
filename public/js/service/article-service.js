;!function (PromiseWrapper) {
    "use strict";

    const articleService = {};

    articleService.maxId = 0;

    articleService.getArticles = () => {
        let onload = (resolve, xhr) => {
            let articles = JSON.parse(xhr.responseText, (key, value) => {
                if (key === 'createdAt') return new Date(value);
                return value;
            });
            articleService.recountMaxId();
            resolve(articles);
        };
        return new PromiseWrapper('article/articles/', onload).get();

    };

    articleService.getArticle = id => {
        let onload = (resolve, xhr) => {
            let article = JSON.parse(xhr.responseText)[0];
            article.createdAt = new Date(article.createdAt);
            resolve(article);
        };
        return new PromiseWrapper('article/article/' + id + '', onload).get();
    };

    articleService.addArticle = article => {
        let onload = (resolve, xhr) => {
          resolve();
        };

        return new PromiseWrapper('article/article/', onload).post(article);
    };

    articleService.removeArticle = id => {
      let onload = (resolve, xhr) => {
          resolve(JSON.parse(xhr.responseText));
      };
      return new PromiseWrapper('article/delete/' + id + '', onload).delete();
    };

    articleService.recountMaxId = () => {
        articleService.getArticles().then(articles => {
            articles.forEach(item => {
                if (articleService.maxId < item.id) articleService.maxId = item.id;
            });
        });
    };

window.articleService = articleService;
}(window.PromiseWrapper);