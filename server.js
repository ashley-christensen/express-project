const { application } = require('express');
const express = require('express');

const friendsController = require('./controllers/friends.controller');
const messagesController = require('./controllers/messages.controller');

const app = express();//SERVER returned from express function
const PORT = 3010;

//register middleware with express with .use()

//first middleware has timer, time most of work
app.use((req, res, next) => {//request received 
 const start = Date.now();//before sent to route
 next();//call to ensure next passes request to correct route handler where response is set
 //actions..:
 const delta = Date.now() - start;//after sent to route, now response is set
 console.log(`${req.method} ${req.url}, ${delta} milliseconds taken!`);
});

//second middleware - returns piece of middleware
//looks at content type , if "content type": "app/json" sets request body to JS object
app.use(express.json());
//req.body now exists because we parse json here. Sets body to empty object if no data or content type other


//==========
// CONTROLLER = process requests, set response
//==========
app.post('/friends', friendsController.postFriend);
app.get('/friends', friendsController.getFriends);
// GET /friends/22 undefined but still MATCHES this handler
app.get('/friends/:friendId', friendsController.getFriend);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.getMessages);

app.listen(PORT, () => {
 console.log(`listening on port...: ${PORT}`);
}); //exactly like listen on Node's HTTP server