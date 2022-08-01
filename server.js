const express = require('express');
const path = require('path');

const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();//SERVER returned from express function

//Settings for view engine 'HandleBars' and 'views' inside 'VIEWS FOLDER'
app.set('view engine', 'hbs');//set parameters for view engine we installed = Handlebars
app.set('views', path.join(__dirname, 'views'));//directory to hold handlebars Template = "Views" folder

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

//make path to SERVE STATIC SITE TO BROWSER using Express.Static('string containing relative path to folder') !!! under relativepath 'public' folder/sending html template
app.use('/site', express.static(path.join(__dirname, 'public')));//serves everything under relative path ='public'
//second middleware - returns piece of middleware
//looks for content type of JSON, parses and sets request body to JS OBJECT
app.use(express.json());
//req.body now exists because we parse json here. Sets body to empty object if no data or if content type is other than JSON
app.get('/', (req, res) => {
 res.render('index', {
  title: 'Title for get / for root, render index on server',
  caption: 'this is the caption. Goes to layout and renders for / and messages, then for body variable in layout, goes to index to find what defined in HERE, a .get method in the server for root',
 });
});

//==========
// CONTROLLER = process requests, set response
//==========

//MOUNTING the __sRouter to root of '/__ and .use(registers as middleware)
app.use('/friends', friendsRouter);//registered - express knows to match REQUESTS to routes in this router
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
 console.log(`listening on port...: ${PORT}`);
}); //exactly like listen on Node's HTTP server