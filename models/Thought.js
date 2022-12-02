const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Student model
const Thought = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtual: true,
      getters: true,
    },
    id: false,
  },
);

Thought.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thoughts = model('Thought', Thought);

module.exports = Thoughts;
