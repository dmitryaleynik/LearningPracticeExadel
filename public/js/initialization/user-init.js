;!function(userService, DOMService, NewArticleInitialization, UserWindowView) {
    "use strict";

    class UserInitialization {

        constructor() {
            this.userWindow = new UserWindowView().render();
            this.userButton = document.querySelector('#user-button');
            this.loginButton = this.userWindow.querySelector('.login');
            this.logoutButton = this.userWindow.querySelector('.logout');
            this.authorizedWindow = this.userWindow.querySelector('.authorized');
            this.authorizeForm = document.forms['authorize-form'];

        }

        init() {
            this.userWindow.hidden = true;
            userService.getCurrentUser().then(user => {
                this.userWindow.hidden = true;
                if (user !== "[]") {
                    user = JSON.parse(user);
                    DOMService.renderUser(user[0].user);
                    this.authorizeForm.hidden = true;
                }
                else {
                    this.logoutButton.hidden = true;
                    document.querySelector('#add-new-article-button').hidden = true;
                }
                this.userButton.addEventListener('click', this.handleAuthorizeFormShowing.bind(this));
                this.userWindow.addEventListener('click', this.onClicked.bind(this));
                //this.logoutButton.addEventListener('click', this.handleLogout.bind(this));
            });
        }

            handleAuthorizeFormShowing() {
                return this.userWindow.hidden ? this.userWindow.hidden = false : this.userWindow.hidden = true;
            };

            onClicked(event) {
                switch(event.target.dataset.purpose) {
                    case 'login':
                        const curUser = this.authorizeForm.elements[0].value;
                        const password = this.authorizeForm.elements[1].value;
                        userService.login({user: curUser, password: password}).then (res => {
                            if (res) {
                                DOMService.renderUser(curUser);
                                this.userWindow.hidden = true;
                                this.authorizeForm.hidden = true;
                                this.authorizedWindow.hidden = false;
                                //remove.showHide.show();
                            }
                        });
                        break;
                    case 'logout':
                        userService.logout().then(() => {
                            DOMService.renderUser('Sign In');
                            this.logoutButton.hidden = true;
                            document.querySelector('#add-new-article-button').hidden = true;
                            this.userWindow.hidden = true;
                            this.authorizeForm.hidden = false;
                            //remove.showHide.hide();
                        });
                        break;
                    case 'new-article':
                        new NewArticleInitialization().init();
                        this.handleAuthorizeFormShowing();
                        break;
                }
            }
    }

    window.UserInitialization = UserInitialization;
}(window.userService, window.DOMService, window.NewArticleInitialization, window.UserWindowView);