'use strict';
class UserMapper {

    constructor() {
        this.db = require('diskdb');
        this.connect = this.db.connect(__dirname + '/../data', ['users', 'curUser']);
    }

    getCurrentUser() {
        return this.db.curUser.find();
    }

    searchUser(user) {
        return this.db.users.find(user);
    }

    login(user) {
        this.db.curUser.save(user);
    }

    logout() {
        this.db.curUser.remove();
        this.db.loadCollections(['curUser']);
    }

}

module.exports = new UserMapper();