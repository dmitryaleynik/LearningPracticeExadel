;!function (PromiseWrapper) {
    "use strict";

    const articleService = {};

    articleService.maxId = 0;

    articleService.getArticles = (top = 0, filter = {}) => {
        let onload = (resolve, xhr) => {
            let articles = JSON.parse(xhr.responseText, (key, value) => {
                if (key === 'createdAt') return new Date(value);
                return value;
            });
            resolve(articles);
        };
        let url = '/article/articles?parameters=' + encodeURIComponent(JSON.stringify({top: top, filter: filter}));
        return new PromiseWrapper(url, onload).get();

        return promise;
    };

    articleService.getArticle = id => {
        let onload = (resolve, xhr) => {
            let article = JSON.parse(xhr.responseText);
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

    articleService.editArticle = (id, article) => {
      let onload = (resolve, xhr) => {
          resolve();
      };
      return new PromiseWrapper('article/edit/' + id + '', onload).patch(article);
    };

    articleService.recountMaxId = () => {
        articleService.getArticles().then(articles => {
            articles.forEach(item => {
                if (articleService.maxId < item.id) articleService.maxId = item.id;
            });
        });
    };

    articleService.validateArticle = (article, mode) => {
        if (mode) {
            if (Object.keys(article).length !== 5)
                return false;
            if (typeof article.title !== 'string' || article.title.length >= 100)
                return false;
            if (typeof article.summary !== 'string' || article.summary.length >= 200)
                return false;
            if (!(article.createdAt instanceof Date))
                return false;
            if (typeof article.author !== 'string')
                return false;
            if (typeof article.content !== 'string')
                return false;
            return true;
        }
        else {
            if (article.title === undefined && article.summary === undefined && article.content === undefined)
                return false;
            if (article.title !== undefined) {
                if (typeof article.title !== 'string')
                    return false;
                else if (article.title.length >= 100)
                    return false;
            }
            if (article.summary !== undefined) {
                if (typeof article.summary !== 'string')
                    return false;
                else if (article.summary.length >= 200)
                    return false;
            }
            if (article.content !== undefined) {
                if (typeof article.content !== 'string')
                    return false;
            }
            return true;
        }
    };

window.articleService = articleService;
}(window.PromiseWrapper);