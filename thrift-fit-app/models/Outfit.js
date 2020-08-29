const db = require('../db/config');

class Outfit {
  constructor(outfit) {
    this.id = outfit.id || null;
    this.user_id = outfit.user_id;
    this.is_sold = outfit.is_sold || false;
    this.description = outfit.description;
    this.img_url = outfit.img_url;
  }

  static getAll() {
    return db
      .manyOrNone('SELECT * FROM outfits ORDER BY id ASC')
      .then((outfits) => outfits.map((outfit) => new this(outfit)));
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
        `INSERT INTO outfits (user_id, description, img_url)
         VALUES ($/user_id/, $/description/, $/img_url/)
         RETURNING *`,
        this
      )
      .then((outfit) => Object.assign(this, outfit));
  }
  
}

module.exports = Outfit;