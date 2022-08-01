const path = require('path');

function getMessages(req, res) {
 res.render('messages', {
  title: 'WHERE is this Title?!',//rendered as title var in hbs
  friend: 'ASHLEY INSIDE MESSAGE ENDPOINT!!...'//rendered as friend var in hbs
 });
 // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'brunches.jpg'));
 //define function at top level of file and not passing as arg to f use keyword, debugging named function, node tells us name of function in log
 // res.send('<ul><li>hello</li></ul>');
};

function postMessage(req, res) {
 console.log('Updating Messges...');
}

module.exports = {
 getMessages,
 postMessage,
};

