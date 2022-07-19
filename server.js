const { application } = require('express');
const express = require('express');

const app = express();//SERVER returned from express function
const PORT = 3010;

app.get('/', (req, res) => {
 res.send('Helloooo!');
});

app.get('/messages', (req, res) => {
 res.send('<ul><li>hello</li></ul>');
});

app.post('/messages', (req, res) => {
 res.send({
  id: 1,
  name: 'Ashley'
 });
});

app.listen(PORT, () => {
 console.log(`listening on port...: ${PORT}`);
}); //exactly like listen on Node's HTTP server