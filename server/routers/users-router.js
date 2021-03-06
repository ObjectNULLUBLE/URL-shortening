const express = require('express');
const bodyParser = require('body-parser');
const linksDAL = require('../DAL/link-manager');

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.get('/:username', function(req, res) {
  res.send(`id: ${req.user._id} | user name: ${req.user.username}`);
});

usersRouter.delete('/:username', function(req, res) {}); //!

usersRouter.get('/:username/logout', function(req, res) {
  res.redirect('/'); //delete token on client
});

usersRouter.get('/:username/links', function(req, res) {
  const username = req.user.username;
  if (username === req.params.username)
    linksDAL.takeFromDB('authorID', username).then(links => res.send(links));
  else res.sendStatus(401);
});

usersRouter.post('/:username/links', function(req, res) {
  try {
    linksDAL.addToDB({ ...req.body }, req.user._id);
    res.sendStatus('201');
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

usersRouter.delete('/:username/links', function(req, res) {
  try {
    linksDAL.deleteOne(req.body.linkID);
    res.sendStatus(202);
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

usersRouter.put('/:username/links', function(req, res) {
  linksDAL.updateOne(req.body.id, req.body.newData);
  res.sendStatus(200);
});

module.exports = usersRouter;
