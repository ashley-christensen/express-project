const express = require('express');

const messagesController = require('../controllers/messages.controller');

const messagesRouter = express.Router();

//which path and method point to which controller/function which handle responses accordingly
messagesRouter.get('/', messagesController.getMessages);
messagesRouter.post('/', messagesController.getMessages);

module.exports = messagesRouter;
