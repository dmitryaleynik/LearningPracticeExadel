;!function() {
    "use strict";

    const DOMService = {};

    DOMService.renderUser = user => {
        let button = document.querySelector('#user-button');
        button.textContent = user;
    };

    window.DOMService = DOMService;
}();