const followersRoutes = require('express').Router();
const followersController = require('../controllers/followers-controller');

const authHelpers = require('../services/auth/auth-helpers');

followersRoutes.get('/follower/', authHelpers.loginRequired, followersController.indexFollowers);
followersRoutes.get('/followed/', authHelpers.loginRequired, followersController.indexFollowed);

followersRoutes.post('/follower', authHelpers.loginRequired, followersController.create);
followersRoutes.delete('/follower/:id', authHelpers.loginRequired, followersController.delete);

module.exports = followersRoutes;