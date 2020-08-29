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

outfitController.show = (req, res, next) => {
  Outfit.getById(req.params.id)
    .then((outfit) => {
      res.json({
        message: 'ok',
        data: { outfit },
      });
    })
    .catch(next);
};

outfitController.create = (req, res, next) => {
  new Outfit({
    user_id: req.body.user_id,
    description: req.body.description,
    img_url: req.body.img_url,
  })
    .save()
    .then((newOutfit) => {
      res.json({
        message: 'Outfit added successfully!',
        data: { newOutfit },
      });
    })
    .catch(next);
};

outfitController.update = (req, res, next) => {
  Outfit.getById(req.params.id)
    .then((outfit) => {
      return outfit.update(req.body);
    })
    .then((updatedOutfit) => {
      res.json({
        message: 'Outfit updated successfully!',
        data: { updatedOutfit },
      });
    })
    .catch(next);
};

module.exports = outfitController;