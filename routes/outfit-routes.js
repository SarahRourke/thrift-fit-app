const express = require('express');
const outfitRoutes = express.Router();

const outfitsController = require('../controllers/outfits-controller');
const authHelpers = require('../services/auth/auth-helpers');

// root route, /api/outfits
outfitRoutes.get('/', outfitsController.index);

// show details for an specific outfit route, /api/outfits/:id
outfitRoutes.get('/outfit/:id', outfitsController.show);

// add new outfit route, /api/outfits/add 
outfitRoutes.post('/', outfitsController.create);

// edit outfit route, /api/outfits/:id
outfitRoutes.put('/:id', outfitsController.update);

// delete outfit route, /api/outfits/:id
outfitRoutes.delete('/:id', outfitsController.delete);

// allow outfit get by users name /api/outfits/user
outfitRoutes.get('/user', outfitsController.indexUser);

module.exports = outfitRoutes;