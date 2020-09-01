const db = require('../db/config');

class User {
    constructor({ id, username, first_name, last_name, email, password_digest, profile_img_url }) {
        this.id = id || null;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password_digest = password_digest;
        this.profile_img_url = profile_img_url;
    }

    static findByUserName(username) {
        return db.oneOrNone(`
        SELECT * FROM users WHERE username = $1
        `, username)
        .then(user => {
            if(user) return new this(user);
            throw new Error(`No user with username ${username} found`);
        })
    }

    save() {
        return db.one(`INSERT INTO users
        (username, first_name, last_name, email, password_digest, profile_img_url)
        VALUES
        ($/username/, $/first_name/, $/last_name/, $/email/, $/password_digest/, $/profile_img_url/)
        RETURNING *`, this)
            .then(user => Object.assign(this, user));
    }
}

module.exports = User;