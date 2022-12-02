const { ObjectId } = require('mongoose').Types;
const { User, thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async users => {
        const usersObj = {
          users,
        };
        return res.json(usersObj);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async user =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            }),
      )
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
      .then(user =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user),
      )
      .catch(err => res.status(500).json(err));
  },
  // Delete user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then(
        user =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : res.json(`${req.params.userId} was deleted`),
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { _id: req.params.userId } },
          { new: true },
        ),
      )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add friend
  addFriend(req, res) {
    // console.log('You are adding a new friend');
    // console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
    )
      .then(user =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID :(' })
          : res.json(user),
      )
      .catch(err => res.status(500).json(err));
  },
  // Remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
    )
      .then(user =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID :(' })
          : res.json(user),
      )
      .catch(err => res.status(500).json(err));
  },
};
