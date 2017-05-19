;!function() {
    "use strict";

    class UserWindowView {

        render() {
            let view = '<form action=\"/user/signin\" method=\"post\" name=\"authorize-form\">' +
                '<label><input type=\"text\" name=\"username\" placeholder=\"username\"></label><br>' +
                '<label><input type=\"password\" name=\"password\" placeholder=\"password\"></label><br>' +
                '<input class=\"login submit-button buttons\" data-purpose=\"login\" ' +
                'value=\"Log in\" type=\"submit\">' +
                '</form> <div class=\"authorized\">' +
                '<div id=\"add-new-article-button\" data-purpose=\"new-article\"' +
                ' class=\"buttons\">Add New Article</div>' +
                '<input class=\"logout submit-button buttons\" data-purpose=\"logout\"' +
                ' value=\"Log out\" type=\"submit\"> </div>';

            let div = document.querySelector('.user-window');
            div.innerHTML = view;

            return div;
        }

    }

    window.UserWindowView = UserWindowView;
}();