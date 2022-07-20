const model = require('../model/friends.model');

function postFriend(req, res) {
 if (!req.body.name) {//validate input data
  return res.status(400).json({ //return from route handler so other res.json() is not sent also! PATTERN
   error: 'Missing friend name'
  });//often most appropriate error for validation on request is failing
 }
 const newFriend = {
  name: req.body.name, //body set to object passed into request, also need to set id
  //req.body won't exist unless we parse json in middleware
  id: model.length//better to process extra data in api automatically

 };
 model.push(newFriend);
 res.json(newFriend);//if friend added successfully, return json for new friend

}

function getFriends(req, res) {
 res.json(model);
}
function getFriend(req, res) {
 const friendId = Number(req.params.friendId);
 const friend = model[friendId];
 if (friend) {
  res.status(200).json(friend);
 } else {
  // res.sendStatus(404);
  res.status(404).json({
   error: 'Friend does not exist'
  });

 }
}

module.exports = {
 postFriend,
 getFriends,
 getFriend
};