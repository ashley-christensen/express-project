const express = require('express');

const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
 console.log(`middlware in friends Router.. ip address, ${req.ip}`);
 //without next() we get the console.log but RESPONSE stays here and never goes to handler!
 next();
});

//below paths are relative to Router they're MOUNTED on
friendsRouter.post('/', friendsController.postFriend);
friendsRouter.get('/', friendsController.getFriends);
// GET /friends/22 undefined but still MATCHES this handler
friendsRouter.get('/:friendId', friendsController.getFriend);




module.exports = friendsRouter;