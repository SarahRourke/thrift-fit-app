const db = require('../db/config');
const User = require('./User')


class Followers {
    constructor({ instance_id, followed_id, follower_id }) {
        this.instance_id = instance_id || null;
        this.follower_id = follower_id;
        this.followed_id = followed_id;
    }
    static getAllFollowers(id){
        return db.manyOrNone(`SELECT users.username, users.id, followers.instance_id
        FROM users 
        JOIN followers 
        ON followers.follower_id=users.id 
        WHERE followers.followed_id = $1
        ORDER BY users.username ASC`, id)
        .then((users) => {
            // console.log(users)
            return users.map((user) => {
                console.log(user)
                return {followerInstance: new this(user), follower: new User(user)}
            })
        })
        // .then((users) => users.map((user) => new this(user)));
    }

    static getAllFollowed(id){
        return db.manyOrNone(`SELECT users.username, users.id, followers.instance_id
        FROM users 
        JOIN followers 
        ON followers.followed_id=users.id 
        WHERE followers.follower_id = $1
        ORDER BY users.username ASC`, id)
        .then((users) => {
            return users.map((user) => {
                console.log(user)
                return {followedInstance: new this(user), followed: new User(user)}
            })
        })
    }

    static getById(id) {
        return db
            .oneOrNone(`SELECT * FROM followers WHERE instance_id = $1`, [id])
            .then((follower) => {
                if (follower) return new this(follower);
                throw new Error(`Follower ${id} not found`);
            });
    }

    save() {
        console.log(this)
        return db   
        .one(`
        INSERT INTO followers
        (follower_id, followed_id)
        VALUES
        ($/follower_id/, $/followed_id/)
        RETURNING *
        `, this)
        .then((user) => Object.assign(this, user));
    }

    delete() {
        console.log(this.id)
        return db.oneOrNone(`DELETE FROM followers WHERE instance_id = $1`, this.instance_id)
    }
}

module.exports = Followers;