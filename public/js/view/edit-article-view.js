;!function() {
    "use strict";

    class EditArticleView {

        render() {
            let view = '<div class=\"edit-article\">' +
                '<form name=\"edit-article-form\"> ' +
                '<table> <tr> <td><label>Title: ' +
                '<input type=\"text\" name=\"title\"></label></td> ' +
                '</tr> <tr> <td><label>Summary: ' +
                '<input type=\"text\" name=\"summary\"></label></td> ' +
                '</tr> <td><label>Content: <textarea name=\"content\">' +
                '</textarea></label></td> <tr> </tr> </table> ' +
                '<input class=\"edit submit-button buttons\" data-purpose=\"edit-article-submit\" ' +
                'value=\"Submit\" type=\"submit\"> </form> </div>';

            let grid = document.querySelector('.news-grid');
            grid.innerHTML = view;
            return grid;
        }
    }

    window.EditArticleView = EditArticleView;
}();