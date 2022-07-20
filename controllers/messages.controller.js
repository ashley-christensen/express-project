function getMessages(req, res) {//define function at top level of file and not passing as arg to f use keyword, debugging named function, node tells us name of function in log
 res.send('<ul><li>hello</li></ul>');
};

function postMessage(req, res) {
 console.log('Updating Messges...');
}

module.exports = {
 getMessages,
 postMessage,
};