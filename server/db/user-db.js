class UserDb {

    constructor() {
        this.mongoose = require('./mongoose');
        this.schema = this.mongoose.Schema({
            username: String,
            password: String
        });
        this.model = this.mongoose.model('users', this.schema);
    }

    getUserByName(username) {
        return this.model.findOne({username: username});
    }

    validatePassword(user, password) {
        return user.password === password;
    }
}

module.exports = new UserDb();