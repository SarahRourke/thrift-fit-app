const express = require('express');
const outfitRoutes = express.Router();

const outfitsController = require('../controllers/outfits-controller');

outfitRoutes.get('/', outfitsController.index);
outfitRoutes.post('/', outfitsController.create);

outfitRoutes.get('/:id', outfitsController.show);
outfitRoutes.put('/:id', outfitsController.update);
outfitRoutes.delete('/:id', outfitsController.delete);

module.exports = outfitRoutes;