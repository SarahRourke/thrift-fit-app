const db = require('../db/config');

class Outfit {
  constructor({ id, user_id, is_sold, description, img_url }) {
    this.id = id || null;
    this.user_id = user_id || null;
    this.is_sold = is_sold || false;
    this.description = description;
    this.img_url = img_url;
  }

  static getAll() {
    return db
      .manyOrNone('SELECT * FROM outfits ORDER BY id ASC')
      .then((outfits) => outfits.map((outfit) => new this(outfit)));
  }
  
}

module.exports = Outfit;