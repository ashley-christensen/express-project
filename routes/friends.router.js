const express = require('express');

const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();

//below paths are relative to Router they're MOUNTED on
friendsRouter.post('/', friendsController.postFriend);
friendsRouter.get('/', friendsController.getFriends);
// GET /friends/22 undefined but still MATCHES this handler
friendsRouter.get('/:friendId', friendsController.getFriend);

module.exports = friendsRouter;