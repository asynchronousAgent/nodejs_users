const mongoose = require("mongoose");
const User = require("./models/Users");
const UsersProfile = require("./models/UsersProfile");

mongoose
  .connect("mongodb://localhost:27017/excellenceuserprofile")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

const func = async () => {
  try {
    const userProfile = await UsersProfile.aggregate([
      {
        $project: {
          user_id: "$user_id",
          userProfile: "$dob",
          Age: {
            $divide: [
              { $subtract: [new Date(), "$dob"] },
              365 * 24 * 60 * 60 * 1000,
            ],
          },
        },
      },
    ]);
    let sum = 0;
    let arr = [];
    let deleted_user = [];
    for (let i = 0; i < userProfile.length; i++) {
      sum += userProfile[i].Age;
      if (userProfile[i].Age > 25) arr.push(userProfile[i]);
    }
    // console.log(userProfile);
    console.log("Average age of all users is:", sum / userProfile.length);
    // console.log(arr);
    for (let j = 0; j < arr.length; j++) {
      let user = await User.findByIdAndRemove(arr[j].user_id);
      await UsersProfile.findByIdAndRemove(arr[j]._id);
      deleted_user.push(user.firstname);
    }
    if (deleted_user.length > 0) {
      console.log("Deleted User:", deleted_user.toString());
    } else {
      console.log("None of the person is above 25");
    }
  } catch (err) {
    console.log(err);
  }
};
func();
