;!function(PromiseWrapper) {
    "use strict";

    const userService = {};

    userService.getCurrentUser = () => {
        let onload = (resolve, xhr) => {
            resolve(xhr.responseText);
        };

        return new PromiseWrapper('/user/curUser/', onload).get();
    };

    userService.login = user => {
      let onload = (resolve, xhr) => {
          xhr.status === 400 ? resolve(false) : resolve(true);
      };

      return new PromiseWrapper('/user/login/', onload).post(user);
    };

    userService.logout = () => {
      let onload = (resolve, xhr) => {
          resolve();
      };

      return new PromiseWrapper('/user/logout/', onload).delete();
    };

    window.userService = userService;
}(window.PromiseWrapper);
