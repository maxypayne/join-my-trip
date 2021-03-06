const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Person" },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email"]
  },

  password: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  img: {
    type: String
  },
  fans: [{ type: Schema.Types.ObjectId, ref: "Person" }]
  // gender: {
  //   type: String,
  //   required: true
  // }
  // photo: {
  //   type: String,
  //   size: 300
  // },
  // tripsCreated: [],

  // tripsJoined: [],
  // favouriteActivities: []
});
const User = mongoose.model("User", userSchema);

module.exports = User;
