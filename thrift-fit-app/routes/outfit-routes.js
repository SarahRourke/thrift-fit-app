const express = require('express');
const outfitRoutes = express.Router();

const outfitsController = require('../controllers/outfits-controller');

outfitRoutes.get('/', outfitsController.index);
outfitRoutes.get('/:id', outfitsController.show);

module.exports = outfitRoutes;