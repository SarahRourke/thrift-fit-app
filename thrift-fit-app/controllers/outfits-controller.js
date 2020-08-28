const Outfit = require('../models/Outfit');

const outfitController = {};

outfitController.index = (req, res, next) => {
    Outfit.getAll()
    .then((outfits) => {
      res.json({
        message: 'ok',
        data: { outfits },        
      });
    })
    .catch(next);
};

outfitController.create = (req, res, next) => {
  new Outfit({
    user_id: req.user.id,
    // is_sold: is not required. Default value is false.
    description: req.body.description,
    img_url: req.user.id,
  })
    .save()
    .then((outfit) => {
      res.json({
        message: 'Outfit added successfully!',
        data: { outfit },
      });
    })
    .catch(next);
};

module.exports = outfitController;