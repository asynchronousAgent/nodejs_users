const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/Users");
const UsersProfile = require("./models/UsersProfile");

mongoose
  .connect("mongodb://localhost:27017/excellenceuserprofile")
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));
const obj = [
  {
    firstname: "Vishal",
    lastname: "Ghosh",
    email: "vishal@gmail.com",
    password: "hellovish",
  },
  {
    firstname: "Sukalyan",
    lastname: "Makal",
    email: "makal@gmail.com",
    password: "hellomakal",
  },
  {
    firstname: "Saugata",
    lastname: "Shee",
    email: "saugata@gmail.com",
    password: "hellosau",
  },
  {
    firstname: "Souvik",
    lastname: "Alu",
    email: "alu@gmail.com",
    password: "helloalu",
  },
  {
    firstname: "Raktim",
    lastname: "Bhowmik",
    email: "raktim@gmail.com",
    password: "helloraktim",
  },
];

const obj2 = [
  {
    email: "vishal@gmail.com",
    dob: new Date("1997-08-28"),
    mobile_no: 5648721499,
  },
  {
    email: "makal@gmail.com",
    dob: new Date("1993-09-04"),
    mobile_no: 5648761489,
  },
  {
    email: "saugata@gmail.com",
    dob: new Date("1997-01-27"),
    mobile_no: 5642721489,
  },
  {
    email: "alu@gmail.com",
    dob: new Date("1995-05-04"),
    mobile_no: 5648521489,
  },
  {
    email: "raktim@gmail.com",
    dob: new Date("1998-03-23"),
    mobile_no: 5638721489,
  },
];
let usersRec = [];
let usersProfile = [];
for (let i = 0; i < obj.length; i++) {
  obj[i].password = bcrypt.hashSync(obj[i].password, 10);
  let newUSer = new User(obj[i]);
  newUSer
    .save()
    .then((resolve) => {
      usersRec.push(resolve);
      //   console.log(`User ${i} saved ${resolve._id}`);
    })
    .catch((err) => console.log(err));
}

const adding = async () => {
  for (let c = 0; c < obj2.length; c++) {
    let user = await User.findOne({ email: obj2[c].email });
    delete obj2[c].email;
    obj2[c]["user_id"] = user._id;
    let userProfile = new UsersProfile(obj2[c]);
    await userProfile.save();
    usersProfile.push(userProfile);
  }
  console.log(usersRec);
  console.log(usersProfile);
};
setTimeout(adding, 2000);
