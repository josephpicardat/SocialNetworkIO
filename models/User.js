const { Schema, model } = require('mongoose');

const User = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required',
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'Email address is required',
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

User.virtual('friendCount').get(function () {
  return this.friends.length;
});

const user = model('User', User);

module.exports = user;
