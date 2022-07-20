const { application } = require('express');
const express = require('express');

const app = express();//SERVER returned from express function

const PORT = 3010;

const friends = [
 {
  id: 0,
  name: 'Sir Isaac newton'
 },
 {
  id: 1,
  name: 'Ashley'
 }
];

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

app.post('/friends', (req, res) => {
 if (!req.body.name) {//validate input data
  return res.status(400).json({ //return from route handler so other res.json() is not sent also! PATTERN
   error: 'Missing friend name'
  });//often most appropriate error for validation on request is failing
 }
 const newFriend = {
  name: req.body.name, //body set to object passed into request, also need to set id
  //req.body won't exist unless we parse json in middleware
  id: friends.length//better to process extra data in api automatically

 };
 friends.push(newFriend);
 res.json(newFriend);//if friend added successfully, return json for new friend

});

app.get('/friends', (req, res) => {
 res.json(friends);
});

// GET /friends/22 undefined but still MATCHES this handler
app.get('/friends/:friendId', (req, res) => {
 const friendId = Number(req.params.friendId);
 const friend = friends[friendId];
 if (friend) {
  res.status(200).json(friend);
 } else {
  // res.sendStatus(404);
  res.status(404).json({
   error: 'Friend does not exist'
  });

 }
});

app.get('/messages', (req, res) => {
 res.send('<ul><li>hello</li></ul>');
});

app.post('/messages', (req, res) => {
 res.send();
});

app.listen(PORT, () => {
 console.log(`listening on port...: ${PORT}`);
}); //exactly like listen on Node's HTTP server