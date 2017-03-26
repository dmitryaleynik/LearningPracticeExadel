'use strict';

var articles11 = [
	{
		id: '1',
		title: 'Hong Kong gets a new leader',
		summary: 'A Beijing-backed civil servant has been chosen as the next leader of Hong Kong.',
		createdAt: new Date('2017-03-26T16:31:00'),
		author: 'Jack',
		content: 'Carrie Lam’s appointment comes amid accusations that Beijing is meddling and denying the ' +
		'financial hub a more populist leader. Lam will become Hong Kong’s first female chief executive when she ' +
		'takes office on July 1.The results:777 votes – Carrie Lam, 365 votes – John Tsang, ' +
		'21 votes – retired judge Woo Kwok-hing. Hundreds of Lam supporters waved China flags and ' +
		'cheered inside and outside the venue after Lam’s win.'
	},
	{
		id: '2',
		title: 'EU leaders mark 60th anniversary of founding treaty',
		summary: 'EU leaders have joined together in Rome to mark the 60th anniversary of the founding treaty of the bloc.',
		createdAt: new Date('2017-02-11T22:22:00'),
		author: 'Bob',
		content: 'It is a show of strength, at a time of turbulence – with Britain absent, as it prepares to exit the bloc.' +
		'The Rome Declaration formed the centrepiece of celebrations, a document which talks of peace and unity.' +
		' “I will sign my dear friends the declaration of Rome with a pen, I should say the pen used in 1957 by ' +
		'Luxembourg to sign the Treaty of Rome. These are the signatures that last,” said Jean-Claude Juncker, ' +
		'European Commission President. The leaders put pen to paper in the Campidoglio palace, the very same' +
		' place that the six founding states signed the Treaty of Rome in 1957 – launching the European Economic' +
		' Community, the EU’s forerunner. The declaration promises to listen to citizens. Some have lots to ' +
		'say right now, with anti-EU protests having been planned around the anniversary event. Brexit has helped' +
		' fuel eurosceptic nationalists challenging governments from Stockholm to Sicily. Pope Francis said ' +
		'on Friday the EU had achieved a lot in six decades, but was facing a “vacuum of values.” He condemned' +
		' anti-immigrant populism and extremism, something he said posed a mortal threat to the bloc. Reporting' +
		' from Rome, Euronews’ Gregoire Lory said: “Under the sun, here in the capital, the 27 Heads of State ' +
		'and Government have displayed their unity, and with their smiles, all the European leaders signed the' +
		' Rome Declaration – 60 years after the Treaty of the same name. “For the President of the European ' +
		'Commission, the document is simply a new beginning for the European project. The priority now is to ' +
		'turn those words into action.”'
	},
	{
		id: '3',
		title: 'Belarus protest turns violent as hundreds arrested.',
		summary: 'Police in Minsk have arrested hundreds of people during a mass rally organised to mark the 99th' +
		' anniversary of the proclamation of the Belarussian People’s Republic.',
		createdAt: new Date('2017-03-25T15:15:00'),
		author: 'Hector',
		content: 'Many used the occasion to denounce an unpopular new tax on those not in full-time ' +
		'employment. At times, special forces deployed to the streets of the capital forcibly removed' +
		' protesters chanting slogans and waving signs against the so-called parasite tax. Passersby ' +
		'and at least ten journalists were reportedly also detained. Ahead of the march, police raided' +
		' the offices of opposition, human rights group Vesna 96 and briefly held dozens of activists. ' +
		'Public anger has been steadily rising amid falling living standards and a two-year-long recession' +
		' in Belarus. The demonstration is the latest in a series held since February that pose the biggest ' +
		'threat in years to long-running President Alexander Lukashenko. He has been seeking to improve' +
		' ties with the west and the EU, as relations cool with former Soviet ruler Russia.'
	}
];
var articlesService = (function() {
	var articles = [];

	function extendedParse(key, value) {
		if(key === 'createdAt')
			return new Date(value);
		return value;
	}

	function getLength() {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		return articles.length;
	}

	function getMaxId() {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		return +articles[articles.length-1].id;
	}

	function compareArticles(a, b) {
		return (a.createdAt < b.createdAt) ? 1 : -1;
	}

	function sortByDate(articles) {
		return articles.sort(compareArticles);
	}

	function getArticles(skip, top, obj) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		articles.forEach(function(item) {
			item.createdAt = new Date(item.createdAt);
		});
		var subarticles = [];
		if (obj)
			subarticles = articles.filter(function(item){
				return item.author === obj.author;
			});
		else
			subarticles = articles.slice(0, articles.length);
		var sskip = skip||0;
		var ttop = top||9;
		var sortedSubarticles = sortByDate(subarticles);
		sortedSubarticles = sortedSubarticles.slice(sskip, sskip+ttop);
		return sortedSubarticles;
	}

	function getArticle(id) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		articles.forEach(function(item) {
			item.createdAt = new Date(item.createdAt);
		});
		if (isNaN(+id)) {
			console.log('Your id is invalid.');
			return false;
		}
		var temp = articles.find(function(item){
			return item.id == id;
		});
		if(!temp)
			console.log('Such article doesn\'t exist.');
		return temp;
	}

	function validateArticle(article, mode) {
		if (mode) {
			if (Object.keys(article).length != 6)
				return false;
			var a = Number(article.id);
			if (isNaN(a))
				return false;
			if (typeof article.title != 'string' || article.title.length >= 100)
				return false;
			if (typeof article.summary != 'string' || article.summary.length >= 200)
				return false;
			if (!article.createdAt instanceof Date)
				return false;
			if (typeof article.author != 'string')
				return false;
			if (typeof article.content != 'string')
				return false;
			return true;
		}
		else {
			if (article.title == undefined && article.summary == undefined && article.content == undefined)
				return false;
			if (article.title != undefined) {
				if (typeof article.title != 'string')
					return false;
				else if (article.title.length >= 100)
					return false;
			}
			if (article.summary != undefined) {
				if (typeof article.summary != 'string')
					return false;
				else if (article.summary.length >= 200)
					return false;
			}
			if (article.content != undefined) {
				if (typeof article.content != 'string')
					return false;
			}
			return true;
		}
	}

	function addArticle(article) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		if (!validateArticle(article, true))
			return false;
		if(articles.find(function (item) {
				return item.id == article.id;
			}))
			return false;
		articles.push(article);
		localStorage.setItem('articles', JSON.stringify(articles));
		return true;
	}

	function editArticle(id, article) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		if (!validateArticle(article, false))
			return false;
		for (var i = 0; i < articles.length; ++i) {
			if (articles[i].id == id) {
				if (article.title != "")
					articles[i].title = article.title;
				if (article.summary != "")
					articles[i].summary = article.summary;
				if (article.content != "")
					articles[i].content = article.content;
				localStorage.setItem('articles', JSON.stringify(articles));
				return true;
			}
		}
		return false;
	}

	function removeArticle(id) {
		articles = JSON.parse(localStorage.getItem('articles', extendedParse));
		if (isNaN(+id)) {
			console.log('Your id is invalid.');
			return false;
		}
		for (var i = 0; i < articles.length; ++i)
			if (articles[i].id == id) {
				articles.splice(i, 1);
				localStorage.setItem('articles', JSON.stringify(articles));
				return true;
			}
		return false;
	}
	return {
		getLength: getLength,
		getMaxId: getMaxId,
		sortByDate: sortByDate,
		getArticles: getArticles,
		getArticle: getArticle,
		validateArticle: validateArticle,
		addArticle: addArticle,
		editArticle: editArticle,
		removeArticle: removeArticle
	};
}());

var articleRenderer = (function() {
	var ARTICLE_TEMPLATE;
	var ARTICLE_LIST_NODE;
	var FILTER_SECTION;
	var FILTER_TEMPLATE;
	var AUTHORIZE_SECTION;

	function init() {
		ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
		ARTICLE_LIST_NODE = document.querySelector('#newsGrid');
		FILTER_SECTION = document.querySelector('#filter-section');
		FILTER_TEMPLATE = document.querySelector('#filter-item-template');
		AUTHORIZE_SECTION = document.querySelector('#authorize');
	}

	function insertArticlesInDOM(articles) {
		var articlesNodes = renderArticles(articles);
		articlesNodes.forEach(function (node) {
			ARTICLE_LIST_NODE.appendChild(node);
		});
	}

	function renderUser(user) {
		AUTHORIZE_SECTION.textContent = user;
	}

	function removeArticlesFromDOM () {
		ARTICLE_LIST_NODE.innerHTML = '';
	}

	function renderFilter(articles) {
		FILTER_SECTION.innerHTML = "";
		var set = new Set(articles.map(function(item) {
			return item.author;
		}));
		var filterItems = renderFilterItems(set);
		filterItems.forEach(function(item) {
			FILTER_SECTION.appendChild(item);
		});
		console.log()
	}

	function renderFilterItems(set) {
		var tSet = [];
		tSet.push("");
		set.forEach(function(item){
			tSet.push(item);
		});
		return tSet.map(function (item){
			var temp = FILTER_TEMPLATE;
			temp.content.querySelector('#filter-item').setAttribute('value', item);
			temp.content.querySelector('#filter-item').textContent = item;
			if (!item)
				temp.content.querySelector('#filter-item').selected = true;
			return temp.content.querySelector('#filter-item').cloneNode(true);
		});
	}

	function renderArticles(articles) {
		return articles.map(function (article) {
			return renderArticle(article);
		})
	}

	function renderArticle (article) {
		var template = ARTICLE_TEMPLATE;
		template.content.querySelector('.article-list-item').dataset.id = article.id;
		template.content.querySelector('.article-list-item-title').textContent = article.title;
		template.content.querySelector('.article-list-item-summary').textContent = article.summary;
		template.content.querySelector('.article-list-item-author').textContent = article.author;
		template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);
		return template.content.querySelector('.article-list-item').cloneNode(true);
	}

	function formatDate(d) {
		var hours = d.getHours();
		if(+hours <= 9)
			hours = '0' + hours;
		var minutes = d.getMinutes();
		if (+minutes <= 9)
			minutes = '0' + minutes;
		return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
			hours + ':' + minutes;
	}

	return {
		init: init,
		insertArticlesInDOM: insertArticlesInDOM,
		removeArticlesFromDOM: removeArticlesFromDOM,
		renderUser: renderUser,
		renderFilter: renderFilter
	};
}());

document.addEventListener('DOMContentLoaded', startApp);

var shownArticles = [];
var currentPaginationArticles = [];

function startApp() {
	articleRenderer.init();
	articleRenderer.renderFilter(JSON.parse(localStorage.getItem('articles')));
}

function renderArticles(skip, top, obj) {
	currentPaginationArticles = articlesService.getArticles(skip, top, obj);
	currentPaginationArticles.forEach(function (item) {
		shownArticles.push(item);
	});
	articleRenderer.insertArticlesInDOM(currentPaginationArticles);
}

function addArticle (article) {
	if (articlesService.addArticle(article)) {
		shownArticles.push(article);
		articlesService.sortByDate(shownArticles);
		articleRenderer.removeArticlesFromDOM();
		articleRenderer.insertArticlesInDOM(shownArticles);
	}
}

function removeArticle(id) {
	if (articlesService.removeArticle(id)) {
		var temp = shownArticles.find(function (elem) {
			return elem.id == id;
		});
		if (temp) {
			shownArticles.splice(shownArticles.indexOf(temp), 1);
			articleRenderer.removeArticlesFromDOM();
			articleRenderer.insertArticlesInDOM(shownArticles);
		}
	}
}

function editArticle(id, obj) {
	if (articlesService.editArticle(id, obj)) {
		var newArticle = articlesService.getArticle(id);
		var oldArticle = shownArticles.find(function(item){
			return item.id == id;
		});
		if (oldArticle) {
			shownArticles.splice(shownArticles.indexOf(oldArticle), 1);
			shownArticles.push(newArticle);
			articlesService.sortByDate(shownArticles);
			articleRenderer.removeArticlesFromDOM();
			articleRenderer.insertArticlesInDOM(shownArticles);
		}
	}
}