const express = require('express');
const outfitRoutes = express.Router();

const outfitsController = require('../controllers/outfits-controller');

// root route, /api/outfits
outfitRoutes.get('/', outfitsController.index);

// show details for an specific outfit route, /api/outfits/:id
outfitRoutes.get('/:id', outfitsController.show);

// add new outfit route, /api/outfits/add 
outfitRoutes.post('/', outfitsController.create);

module.exports = outfitRoutes;