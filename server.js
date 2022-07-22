const express = require('express');
const path = require('path');

const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();//SERVER returned from express function
const PORT = 3010;

//register middleware with express with .use()

//first middleware has timer, time most of work
app.use((req, res, next) => {//request received 
 const start = Date.now();//before sent to route
 next();//call to ensure next passes request to correct route handler where response is set
 //actions..:
 const delta = Date.now() - start;//after sent to route, now response is set
 console.log(`${req.method} ${req.baseUrl}${req.url}, ${delta} milliseconds taken!`);
});

//make path to serve static site under relativepath 'public' folder
app.use('/site', express.static(path.join(__dirname, 'public')));//serves everything under relative path ='public'
//second middleware - returns piece of middleware
//looks at content type , if "content type": "app/json" parses JSON to JS OBJECT
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