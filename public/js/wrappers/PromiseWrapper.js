;!function () {
    "use strict";

    class PromiseWrapper {

        constructor(url, onload) {
            this.url = url;
            this.onload = onload;
        }

        get() {
            return new Promise ((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', this.url, true);
                xhr.send();

                xhr.onload = () => {
                    this.onload(resolve, xhr);
                };

                xhr.onerror = () => {
                  reject(new Error('Error :('));
                };
            })
        }

        post(value) {
            return new Promise ((resolve, reject) => {
              let xhr = new XMLHttpRequest();
              xhr.open('POST', this.url, true);
              xhr.setRequestHeader('content-type', 'application/json');
              xhr.send(JSON.stringify(value));

              xhr.onload = () => {
                  this.onload(resolve, xhr);
              };

                xhr.onerror = () => {
                    reject(new Error('Error :('));
                };
            })
        }

        delete(value) {
            return new Promise ((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('DELETE', this.url, true);
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(value));

                xhr.onload = () => {
                    this.onload(resolve, xhr);
                };

                xhr.onerror = () => {
                    reject(new Error('Error :('));
                };
            })
        }

        patch(value) {
            return new Promise ((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('PATCH', this.url, true);
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify(value));

                xhr.onload = () => {
                    this.onload(resolve, xhr);
                };

                xhr.onerror = () => {
                    reject(new Error('Error :('));
                };
            })
        }
    }

    window.PromiseWrapper = PromiseWrapper;
}();