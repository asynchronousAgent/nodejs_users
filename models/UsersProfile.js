const mongoose = require("mongoose");

const usersProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dob: {
    type: Date,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: true,
    // validate: {
    //   validator: (v) => /d{10}/.test(v),
    // },
    // message: "It is not a valid phone numeber",
  },
});

const UsersProfile = mongoose.model("UsersProfile", usersProfileSchema);

module.exports = UsersProfile;
