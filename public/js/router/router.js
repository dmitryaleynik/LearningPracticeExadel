;!function (GridInitialization, UserInitialization) {
    "use strict";

    class Router {

        constructor() {
            this.gridInitialization = new GridInitialization();
            this.userInitialization = new UserInitialization();
        }

        init() {
            this.gridInitialization.init();
            this.userInitialization.init();
        }
    }

    const router = new Router();
    window.addEventListener('load', router.init.bind(router));
}(window.GridInitialization, window.UserInitialization);