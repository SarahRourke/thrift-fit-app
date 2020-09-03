const followersRoutes = require('express').Router();
const followersController = require('../controllers/followers-controller');

const authHelpers = require('../services/auth/auth-helpers');

followersRoutes.get('/follower/', authHelpers.loginRequired, followersController.indexFollowers);
followersRoutes.get('/followed/', authHelpers.loginRequired, followersController.indexFollowed);

<<<<<<< HEAD
=======
followersRoutes.get('/followed/checkFollowed/:id', authHelpers.loginRequired, followersController.indexFollowed);

>>>>>>> 2dff372290d9396f6fa976c5203e51914729fe98
followersRoutes.post('/follower', authHelpers.loginRequired, followersController.create);
followersRoutes.delete('/follower/:id', authHelpers.loginRequired, followersController.delete);

module.exports = followersRoutes;