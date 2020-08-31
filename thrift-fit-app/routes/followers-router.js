const followersRoutes = require('express').Router();
const followersController = require('../controllers/followers-controller');

followersRoutes.get('/follower/:id', followersController.indexFollowers);
followersRoutes.get('/followed/:id', followersController.indexFollowed);

followersRoutes.post('/follower', followersController.create);
followersRoutes.delete('/follower/:id', followersController.delete);

module.exports = followersRoutes;