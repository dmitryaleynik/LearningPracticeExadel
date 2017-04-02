;!function () {

    let pagination = {};

    let TOTAL;
    let PER_PAGE = 3;
    let CURRENT_PAGE;
    let SHOW_MORE_BUTTON;
    let FILTER;
    let SHOW_MORE_CALLBACK;


    pagination.init = (total, showMoreCb, filter) => {
        TOTAL = total;
        FILTER = filter;
        CURRENT_PAGE = 1;
        SHOW_MORE_CALLBACK = showMoreCb;
        SHOW_MORE_BUTTON = document.getElementById('pagination-button');
        SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick);
        SHOW_MORE_CALLBACK(0, 3, FILTER);
        SHOW_MORE_BUTTON.hidden = false;
        if (getTotalPages() <= CURRENT_PAGE) {
            pagination.showHide.hide();
        }

        return getParams();
    };

    function handleShowMoreClick() {
        let paginationParams = nextPage();
        SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top, FILTER);
    }

    function getTotalPages() {
        return Math.ceil(TOTAL / PER_PAGE);
    }

    function nextPage() {
        CURRENT_PAGE++;
        if (getTotalPages() <= CURRENT_PAGE) pagination.showHide.hide();
        return getParams();
    }

    function getParams() {
        return {
            top: PER_PAGE,
            skip: (CURRENT_PAGE - 1) * PER_PAGE
        };
    }

    pagination.showHide = {};

    pagination.showHide.hide = () => {
        return SHOW_MORE_BUTTON.hidden = true;
    };

    pagination.showHide.show = () => {
        if (getTotalPages() > CURRENT_PAGE)
            return SHOW_MORE_BUTTON.hidden = false;
    };

   window.pagination = pagination;
}();