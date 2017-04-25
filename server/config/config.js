const CONFIG = {
	TOP_DEFAULT: 9,
	SKIP_DEFAULT: 0,
	VALIDATION_SCHEME: {
		ARTICLE: {
			ID: {
				key: 'id',
				type: 'String'
			},
			TITLE: {
				key: 'title',
				type: 'String'
			},
			SUMMARY: {
				key: 'summary',
				type: 'String'
			},
			CREATED_AT: {
				key: 'createdAt',
				type: 'Date'
			},
			AUTHOR: {
				key: 'author',
				type: 'String'
			},
			CONTENT: {
				key: 'content',
				type: 'String'
			},

			all() {
				retutn [this.ID, this.TITLE, this.SUMMARY, this.CREATED_AT, this.AUTHOR, this.CONTENT];
			}
		}
	}

};
module.exports = CONFIG;
