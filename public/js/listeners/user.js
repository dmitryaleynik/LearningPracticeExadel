;!function(DOMService, addNew){

    let user = {};

    let USER_BUTTON;
    let USER_WINDOW;
    let AUTHORIZE_FORM;
    let LOGIN_BUTTON;
    let LOGOUT_BUTTON;
    let AUTHORIZED_WINDOW;

    user.init = () => {
        USER_BUTTON = document.querySelector('#user-button');
        USER_WINDOW = document.querySelector('.user-window');
        LOGIN_BUTTON = document.querySelector('.login');
        LOGOUT_BUTTON = document.querySelector('.logout');
        AUTHORIZED_WINDOW = document.querySelector('.authorized');
        AUTHORIZE_FORM = document.forms['authorize-form'];
        USER_WINDOW.hidden = true;
        let temp = user.getCurrentUser();
        if (temp) {
            DOMService.renderUser(temp);
            AUTHORIZE_FORM.hidden = true;
        }
        else {
            LOGOUT_BUTTON.hidden = true;
            document.querySelector('#add-new-article-button').hidden = true;
        }
        USER_BUTTON.addEventListener('click', handleAuthorizeFormShowing);
        LOGIN_BUTTON.addEventListener('click', handleLogIn);
        LOGOUT_BUTTON.addEventListener('click', handleLogOut);
    };

    function handleAuthorizeFormShowing() {
        if (USER_WINDOW.hidden) {
            return USER_WINDOW.hidden = false;
        } else {
            return USER_WINDOW.hidden = true;
        }
    }

    user.hideUserForm = handleAuthorizeFormShowing;

    function handleLogIn() {
        let curUser = AUTHORIZE_FORM.elements[0].value;
        if (user) {
            user.login({user:curUser});
            DOMService.renderUser(curUser);
            USER_WINDOW.hidden = true;
            AUTHORIZE_FORM.hidden = true;
            AUTHORIZED_WINDOW.hidden = false;
        }
    }

    function handleLogOut() {
        user.logout();
        DOMService.renderUser('Name');
        LOGOUT_BUTTON.hidden = true;
        document.querySelector('#add-new-article-button').hidden = true;
        USER_WINDOW.hidden = true;
        AUTHORIZE_FORM.hidden = false;
    }

    user.login = (curUser) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/login');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(curUser));
    };

    user.logout = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/loout');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send();
    };

    user.getCurrentUser = () => {
        "use strict";
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/curUser', false);
        xhr.send();

        return (xhr.responseText)[0];
    };


    window.user = user;
}(window.DOMService, window.addNew);