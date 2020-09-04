const db = require('../db/config');

class User {
    constructor({ id, username, first_name, last_name, email, password_digest, profile_img_url, bio, zip_code, state, city }) {
        this.id = id || null;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password_digest = password_digest;
        this.profile_img_url = profile_img_url;
        this.bio = bio;
        this.zip_code = zip_code;
        this.state = state;
        this.city = city;
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

    static getById(id) {
        return db
          .oneOrNone('SELECT * FROM users WHERE id = $1', [id])
          .then((user) => {
            if (user) return new this(user);
            throw new Error(`User ${id} not found`);
          });
      }

    //   static getTwoById(id, id2) {
    //     return db
    //       .manyOrNone('SELECT * FROM users WHERE id = $1 OR id = $2', [id, id2])
    //       .then((users) => users.map((user) => 
    //         new this(user))
    //     );
    //   }

    save() {
        return db.one(`INSERT INTO users
        (username, first_name, last_name, email, password_digest, profile_img_url, bio, zip_code, state, city)
        VALUES
        ($/username/, $/first_name/, $/last_name/, $/email/, $/password_digest/, $/profile_img_url/, $/bio/, $/zip_code/, $/state/, $/city/)
        RETURNING *`, this)
            .then(user => Object.assign(this, user));
    }
}

module.exports = User;