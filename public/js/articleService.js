;!function (articles) {
	"use strict";

	articles = articles || [];

	let articleService = {};


        articleService.getLength = () => {
            articles = articleService.getArticlesFromDb();
            return articles.length;
        };

        articleService.getMaxId = () => {
            articles = articleService.getArticlesFromDb();
            return +articles[articles.length-1].id;
        };

        function compareArticles(a, b) {
            return (a.createdAt < b.createdAt) ? 1 : -1;
        }

        articleService.sortByDate = (articles) => {
            return articles.sort(compareArticles);
        };

        articleService.getArticles = (skip, top, obj) => {
            articles = articleService.getArticlesFromDb();
            articles.forEach(function(item) {
                item.createdAt = new Date(item.createdAt);
            });
            let subarticles = [];
            if (obj)
                subarticles = articles.filter(function(item){
                    return item.author === obj.author;
                });
            else
                subarticles = articles.slice(0, articles.length);
            let sskip = skip||0;
            let ttop = top||9;
            let sortedSubarticles = articleService.sortByDate(subarticles);
            sortedSubarticles = sortedSubarticles.slice(sskip, sskip+ttop);
            return sortedSubarticles;
        };

        articleService.getArticle = (id) => {
            articles = articleService.getArticlesFromDb();
            articles.forEach(function(item) {
                item.createdAt = new Date(item.createdAt);
            });
            if (isNaN(+id)) {
                console.log('Your id is invalid.');
                return false;
            }
            let temp = articles.find(function(item){
                return item.id === id;
            });
            if(!temp)
                console.log('Such article doesn\'t exist.');
            return temp;
        };

        articleService.validateArticle = (article, mode) => {
            if (mode) {
                if (Object.keys(article).length !== 6)
                    return false;
                let a = Number(article.id);
                if (isNaN(a))
                    return false;
                if (typeof article.title !== 'string' || article.title.length >= 100)
                    return false;
                if (typeof article.summary !== 'string' || article.summary.length >= 200)
                    return false;
                if (!article.createdAt instanceof Date)
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

        articleService.addArticle = (article) => {
            articles = articleService.getArticlesFromDb();
            if (!articleService.validateArticle(article, true))
                return false;
            if(articles.find( (item) => { return item.id === article.id; }))
                return false;
            articles.push(article);
            articleService.setArticlesToDb();
            return true;
        };

        articleService.editArticle = (id, article) => {
            articles = articleService.getArticlesFromDb();
            if (!articleService.validateArticle(article, false))
                return false;
            for (let i = 0; i < articles.length; ++i) {
                if (articles[i].id === id) {
                    if (article.title !== "")
                        articles[i].title = article.title;
                    if (article.summary !== "")
                        articles[i].summary = article.summary;
                    if (article.content !== "")
                        articles[i].content = article.content;
                    articleService.setArticlesToDb();
                    return true;
                }
            }
            return false;
        };

		articleService.removeArticle = (id) => {
            articles = articleService.getArticlesFromDb();
            if (isNaN(+id)) {
                console.log('Your id is invalid.');
                return false;
            }
            for (let i = 0; i < articles.length; ++i)
                if (articles[i].id === id) {
                    articles.splice(i, 1);
                    articleService.setArticlesToDb();
                    return true;
                }
            return false;
        };



        articleService.getArticlesFromDb = () => {
        		let xhr = new XMLHttpRequest();
        		xhr.open('GET', '/articles', false);
        		xhr.send();

        		articles = JSON.parse(xhr.responseText, (key, value) => {
                    if(key === 'createdAt') return new Date(value);
                    return value;
				});

        		return articles;
		};

        articleService.setArticlesToDb = () => {
        	let xhr = new XMLHttpRequest();
        	xhr.open('POST', '/articles', true);
        	xhr.setRequestHeader('content-type', 'application/json');
        	xhr.send(JSON.stringify(articles));
		};

        window.articleService = articleService;
}(window.articles);