const express = require('express');

const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/friends.router');

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

//MOUNTING the __sRouter to root of '/__ and .use(registers as middleware)
app.use('/friends', friendsRouter);//registered - express knows to match REQUESTS to routes in this router
app.use('/messages', messagesRouter);


app.listen(PORT, () => {
 console.log(`listening on port...: ${PORT}`);
}); //exactly like listen on Node's HTTP server