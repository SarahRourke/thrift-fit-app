const db = require('../db/config');

const User = require('./User');

class Outfit {
  constructor(outfit) {
    this.id = outfit.id || null;
    this.user_id = outfit.user_id;
    this.is_sold = outfit.is_sold || false;
    this.description = outfit.description;
    this.img_url = outfit.img_url;
    this.price = outfit.price || null;
    this.img_url_01 = outfit.img_url_01;
    this.img_url_02 = outfit.img_url_02;
  }

  // static getAll() {
  //   return db
  //     .manyOrNone('SELECT * FROM outfits ORDER BY id ASC')
  //     .then((outfits) => outfits.map((outfit) => new this(outfit)));
  // }

  static getAll() {
    return db
      .manyOrNone(`SELECT outfits.*, users.username
      FROM outfits
      JOIN users
      On outfits.user_id=users.id 
      ORDER BY outfits.id ASC`)
      .then((outfits) => outfits.map((outfit) => {
        return {outfit: new this(outfit), user: new User(outfit)}
      }));
  }


  static getAllUser(id) {
    return db
      .manyOrNone('SELECT * FROM outfits WHERE user_id = $1 ORDER BY id ASC', id)
      .then((outfits) => outfits.map((outfit) => new this (outfit)))
  }

  static getById(id) {
    return db
      .oneOrNone('SELECT * FROM outfits WHERE id = $1', [id])
      .then((outfit) => {
        if (outfit) return new this(outfit);
        throw new Error(`Outfit ${id} not found`);
      });
  }

  save() {
    return db
      .one(
        `INSERT INTO outfits (user_id, description, img_url, price, img_url_01, img_url_02)
         VALUES ($/user_id/, $/description/, $/img_url/, $/price/, $/img_url_01/, $/img_url_02/)
         RETURNING *`,
        this
      )
      .then((outfit) => Object.assign(this, outfit));
  }

  update(changes) {
    if (changes.price>= 0.00) {
      Object.assign(this, changes);
      return db
        .one(
          `
            UPDATE outfits SET
            is_sold = $/is_sold/,
            description = $/description/,
            img_url = $/img_url/,
            price = $/price/,
            img_url_01 = $/img_url_01/,
            img_url_02 = $/img_url_02/
            WHERE id = $/id/
            RETURNING *
          `,
          this
        )
        .then((updatedOutfit) => Object.assign(this, updatedOutfit));
    } else {
      throw new Error("Price cannot be negative");      
    }
  }

  delete() {
    return db.none('DELETE FROM outfits WHERE id = $1', this.id);
  }
  
}

module.exports = Outfit;