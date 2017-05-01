!function(DOMService, remove){
	'use strict';

	const user = {};

	let USER_BUTTON;
	let USER_WINDOW;
	let AUTHORIZE_FORM;
	let LOGIN_BUTTON;
	let LOGOUT_BUTTON;
	let AUTHORIZED_WINDOW;

	user.init = () => {
		USER_BUTTON = document.querySelector('#username-button');
		USER_WINDOW = document.querySelector('.username-window');
		LOGIN_BUTTON = document.querySelector('.login');
		LOGOUT_BUTTON = document.querySelector('.logout');
		AUTHORIZED_WINDOW = document.querySelector('.authorized');
		AUTHORIZE_FORM = document.forms['authorize-form'];
		USER_WINDOW.hidden = true;
		const temp = user.getCurrentUser();
		if (temp) {
			DOMService.renderUser(temp);
			AUTHORIZE_FORM.hidden = true;
		}
		else {
			LOGOUT_BUTTON.hidden = true;
			document.querySelector('#add-new-article.js-button').hidden = true;
		}
		USER_BUTTON.addEventListener('click', handleAuthorizeFormShowing);
		LOGIN_BUTTON.addEventListener('click', handleLogIn);
		LOGOUT_BUTTON.addEventListener('click', handleLogOut);
	};

	const handleAuthorizeFormShowing = () => {
		if (USER_WINDOW.hidden) {
			return USER_WINDOW.hidden = false;
		} else {
			return USER_WINDOW.hidden = true;
		}
	};

	user.hideUserForm = handleAuthorizeFormShowing;

	const handleLogIn = () => {
		const curUser = AUTHORIZE_FORM.elements[0].value;
		const password = AUTHORIZE_FORM.elements[1].value;
		if (user.login({username: curUser, password})) {
			DOMService.renderUser(curUser);
			USER_WINDOW.hidden = true;
			AUTHORIZE_FORM.hidden = true;
			AUTHORIZED_WINDOW.hidden = false;
			remove.showHide.show();
		}
	};

	const handleLogOut = () => {
		user.logout();
		DOMService.renderUser('Sign In');
		LOGOUT_BUTTON.hidden = true;
		document.querySelector('#add-new-article.js-button').hidden = true;
		USER_WINDOW.hidden = true;
		AUTHORIZE_FORM.hidden = false;
		remove.showHide.hide();
	};

	user.login = (curUser) => {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', '/login');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.send(JSON.stringify(curUser));
		return xhr.status == 400 ? false : true;
	};

	user.logout = () => {
		const xhr = new XMLHttpRequest();
		xhr.open('DELETE', '/logout');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.send();
	};

	user.getCurrentUser = () => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/curUser', false);
		xhr.send();
		const temp = JSON.parse(xhr.responseText)[0];
		return temp ? temp.username : false;
	};


	window.username = user;
}(window.DOMService, window.remove);