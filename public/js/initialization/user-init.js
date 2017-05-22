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
        if (user !== "Unauthorized") {
          window.curUser = user;
          DOMService.renderUser(window.curUser);
          this.authorizeForm.hidden = true;
        } else {
          window.curUser = "";
          this.logoutButton.hidden = true;
          document.querySelector('#add-new-article-button').hidden = true;
        }
        this.userButton.addEventListener('click', this.handleAuthorizeFormShowing.bind(this));
        this.userWindow.addEventListener('click', this.onClicked.bind(this));
      });
    }

    handleAuthorizeFormShowing() {
      return this.userWindow.hidden ? this.userWindow.hidden = false : this.userWindow.hidden = true;
    };

    onClicked(event) {
      switch(event.target.dataset.purpose) {
        case 'login':
          userService.login({status: "ok"}).then (res => {
            if (res) {
              window.curUser = curUser;
              DOMService.renderUser(curUser);
              this.userWindow.hidden = true;
              this.authorizeForm.hidden = true;
              this.authorizedWindow.hidden = false;
              window.showable.remove.forEach(item => {
                 item.hidden = false;
              });

            }
          });
          break;
        case 'logout':
          userService.logout().then(() => {
            window.curUser = "";
            DOMService.renderUser('Sign In');
            this.logoutButton.hidden = true;
            document.querySelector('#add-new-article-button').hidden = true;
            this.userWindow.hidden = true;
            this.authorizeForm.hidden = false;
            window.showable.remove.forEach(item => {
              item.hidden = true;
            });
          });
          break;
        case 'new-article':
          Object.keys(showable).forEach(key => {
            showable[key].hidden = true;
          });
          new NewArticleInitialization().init();
          this.handleAuthorizeFormShowing();
          break;
      }
    }
  }

  window.UserInitialization = UserInitialization;
}(window.userService, window.DOMService, window.NewArticleInitialization, window.UserWindowView);