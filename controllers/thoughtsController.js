const { ObjectId } = require('mongoose').Types;
const { User, Thoughts, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then(async thoughts => {
        const thoughtsObj = {
          thoughts,
        };
        return res.json(thoughtsObj);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err, 'huh??');
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then(async thought =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought),
      )
      .catch(err => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then(thought => res.json(thought))
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a Thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought),
      )
      .catch(err => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Thoughts.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull: { _id: req.params.thoughtId } },
              { new: true },
            ),
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch(err => res.status(500).json(err));
  },

  // Create a Reaction
  addReaction(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : Reaction.create(req.body),
      )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a Reaction
  removeReaction(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then(thought =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : Reaction.findOneAndUpdate(
              { _id: req.params.reactionId },
              { $pull: { _id: req.params.reactionId } },
              { new: true },
            ),
      )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
