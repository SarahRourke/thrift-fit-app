const express = require('express');
const outfitRoutes = express.Router();

const outfitsController = require('../controllers/outfits-controller');

outfitRoutes.get('/', outfitsController.index);

module.exports = outfitRoutes;