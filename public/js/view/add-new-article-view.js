;!function() {
    "use strict";

    class AddNewArticleView {

        render() {
            let view = '<div class=\"new-article\">' +
                '<form name=\"new-article-form\">' +
                '<table> <tr> <td>Title: </td>' +
                '<td><input type=\"text\" name=\"title\"></td>' +
                '</tr> <tr> <td>Summary: </td>' +
                '<td><input type=\"text\" name=\"summary\"></td>' +
                '</tr> <tr> <td>Date: </td>' +
                '<td><input type=\"datetime-local\" name=\"date\"></td>' +
                '</tr> <tr> <td>Content: </td> ' +
                '<td><textarea name=\"content\"></textarea></td>' +
                '</tr> </table>' +
                '<input class=\"add submit-button buttons\" data-purpose=\"new-article-submit\"' +
                ' type=\"submit\" value=\"Submit\">' +
                '</form> </div>';

            let grid = document.querySelector('.news-grid');
            grid.innerHTML = view;
            return grid;
        }

    }

    window.AddNewArticleView = AddNewArticleView;
}();