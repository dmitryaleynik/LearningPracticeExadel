!function (articles) {
	'use strict';

	articles = articles || [];

	const articleService = {};


	articleService.getLength = () => {
		return articleService.getArticlesFromDb().then (articles => {
			return articles.length;
		});
	};

	articleService.getMaxId = () => {
		return articleService.getArticlesFromDb().then (articles => {
			let maxId = 0;
			articles.forEach(item => {
				return item.id > maxId ? maxId = item.id : false;
			});
			return Number(maxId);
		});
	};

	articleService.compareArticles = (a, b) => {
		return (a.createdAt < b.createdAt) ? 1 : -1;
	};

	const sortByDate = (articles) => {
		return articles.sort(articleService.compareArticles);
	};

	articleService.getArticles = (skip, top, obj) => {
		let promise = articleService.getArticlesFromDb().then(articles => {
			let subarticles = [];
			if (obj)
				subarticles = articles.filter(function(item){
					return item.author === obj.author;
				});
			else
					subarticles = articles.slice(0, articles.length);
			const sskip = skip||0;
			const ttop = top||9;
			let sortedSubarticles = sortByDate(subarticles);
			sortedSubarticles = sortedSubarticles.slice(sskip, sskip+ttop);
			return sortedSubarticles;
        });
		return promise;
	};

	articleService.getArticle = id => {
		return articleService.getArticlesFromDb().then(articles => {
			if (isNaN(Number(id))) {
				return false;
			}
			let temp = articles.find(function(item){
				return item.id === id;
			});
			if(temp)
				return temp;
		});
	};

	articleService.validateArticle = (article, mode) => {
		if (mode) {
			if (Object.keys(article).length !== 6)
				return false;
			const a = Number(article.id);
			if (isNaN(a))
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

	articleService.addArticle = article => {
		return articleService.getArticlesFromDb().then(articles => {
            if (!articleService.validateArticle(article, true))
				return false;
			if(articles.find( (item) => { return item.id === article.id; }))
				return false;
			articles.push(article);
			return articles;
        })
			.then (articles => {
				articleService.setArticlesToDb(articles);
				return true;
		});
	};

	articleService.editArticle = (id, article) => {
		articleService.getArticlesFromDb().then(articles => {
            if (!articleService.validateArticle(article, false))
				return false;
			for (let i = 0; i < articles.length; ++i) {
				if (articles[i].id === id) {
					if (article.title !== '')
						articles[i].title = article.title;
					if (article.summary !== '')
						articles[i].summary = article.summary;
					if (article.content !== '')
						articles[i].content = article.content;
					return articles;
				}
			}
			return false;
        })
			.then(articles => {
				articleService.setArticlesToDb(articles);
			});
	};

	articleService.removeArticle = id => {
		return articleService.getArticlesFromDb().then(articles => {
            if (isNaN(Number(id))) {
				return false;
			}
			for (let i = 0; i < articles.length; ++i)
				if (articles[i].id === id) {
					articles.splice(i, 1);
					return articles;
				}
			return false;
        })
			.then(articles => {
				articleService.setArticlesToDb(articles);
				return articles;
			});
	};



	articleService.getArticlesFromDb = () => {

		return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/articles', true);

            xhr.onload = () => {
                let articles = JSON.parse(xhr.responseText, (key, value) => {
                    if (key === 'createdAt') return new Date(value);
                    return value;
                });
				resolve(articles);
            };
            xhr.send();
        });
	};

	articleService.setArticlesToDb = articles => {

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/articles', true);
			xhr.setRequestHeader('content-type', 'application/json');
			xhr.onload = () => {
				resolve();
			};
			xhr.send(JSON.stringify(articles));

		});
	};

	window.articleService = articleService;
}(window.articles);