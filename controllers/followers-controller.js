const Followers = require('../models/Followers');

const followersController = {};

followersController.indexFollowers = (req, res, next) => {
    Followers.getAllFollowers(req.user.id)
        .then((followers) => {
            res.json({
                message: 'ok',
                data: { followers },
            });
        })
        .catch(next)
}

followersController.indexFollowed = (req, res, next) => {
    Followers.getAllFollowed(req.user.id)
        .then((followed) => {
            res.json({
                message: 'ok',
                data: { followed },
            });
        })
        .catch(next)
}

followersController.create = (req, res, next) => {
    new Followers({
        follower_id: req.user.id,
        followed_id: req.body.followed_id,
    })
        .save()
        .then((newFollower) => {
            res.json({
                message: 'You followed them!',
                data: { newFollower },
            });
        })
        .catch(next);
};

followersController.delete = (req, res, next) => {
    Followers.getById(req.params.id)
        .then((follower) => {
            follower.delete()})
        .then(() => {
            res.json({
                message: 'You are no longer following them!',
            });
        })
        .catch(next);
};

module.exports = followersController;