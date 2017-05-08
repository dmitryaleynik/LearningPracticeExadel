;!function(articleService) {
    "use strict";

    class FilterInitialization {

        constructor(authors) {
            this.authors = authors;
        }

        render() {
            let form = document.querySelector('#filter');
            form.innerHTML = "";
            let option = document.createElement('option');
            option.id = 'filter-item';
            option.value = "";
            option.textContent = "";
            form.appendChild(option);
            this.authors.forEach(item => {
                let option = document.createElement('option');
                option.id = 'filter-item';
                option.value = item;
                option.textContent = item;
                form.appendChild(option);
            });
            return form;
        }
    }
    window.FilterInitialization = FilterInitialization;
}(window.articleService);