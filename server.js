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
  {
    firstname: "Gftgc",
    lastname: "Bhowmik",
    email: "gftgc@gmail.com",
    password: "hellorgftgc",
  },
  {
    firstname: "Tapan",
    lastname: "Bhowmik",
    email: "tapan@gmail.com",
    password: "hellortapan",
  },
  {
    firstname: "Bapan",
    lastname: "Mandal",
    email: "bapan@gmail.com",
    password: "hellorbapan",
  },
  {
    firstname: "Babul",
    lastname: "Manu",
    email: "babul@gmail.com",
    password: "hellobabul",
  },
  {
    firstname: "Sentu",
    lastname: "koley",
    email: "sentu@gmail.com",
    password: "hellosentu",
  },
  {
    firstname: "Ghontu",
    lastname: "Saha",
    email: "ghontu@gmail.com",
    password: "helloghontu",
  },
  {
    firstname: "Kalu",
    lastname: "Saha",
    email: "kalu@gmail.com",
    password: "hellokalu",
  },
  {
    firstname: "Gammyu",
    lastname: "Seth",
    email: "gammyu@gmail.com",
    password: "hellogammyu",
  },
  {
    firstname: "Ghonaaa",
    lastname: "Lal",
    email: "ghonaa@gmail.com",
    password: "helloghonna",
  },
  {
    firstname: "Pantu",
    lastname: "Dutt",
    email: "pantu@gmail.com",
    password: "hellogpantu",
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
  {
    email: "gftgc@gmail.com",
    dob: new Date("1992-03-23"),
    mobile_no: 5638721489,
  },
  {
    email: "tapan@gmail.com",
    dob: new Date("1999-03-23"),
    mobile_no: 5638721489,
  },
  {
    email: "bapan@gmail.com",
    dob: new Date("2002-03-23"),
    mobile_no: 5638721489,
  },
  {
    email: "babul@gmail.com",
    dob: new Date("1987-03-23"),
    mobile_no: 5638721489,
  },
  {
    email: "sentu@gmail.com",
    dob: new Date("1957-03-23"),
    mobile_no: 9638701489,
  },
  {
    email: "ghontu@gmail.com",
    dob: new Date("2017-03-23"),
    mobile_no: 5638121489,
  },
  {
    email: "kalu@gmail.com",
    dob: new Date("1997-03-23"),
    mobile_no: 7638721489,
  },
  {
    email: "gammyu@gmail.com",
    dob: new Date("1981-03-23"),
    mobile_no: 6638721489,
  },
  {
    email: "ghonaa@gmail.com",
    dob: new Date("1992-10-23"),
    mobile_no: 5638721489,
  },
  {
    email: "pantu@gmail.com",
    dob: new Date("1977-08-23"),
    mobile_no: 9538721489,
  },
];
let usersRec = [];
let usersProfile = [];
for (let i = 0; i < obj.length; i++) {
  obj[i].password = bcrypt.hashSync(obj[i].password, 10);
  let newUSer = new User(obj[i]);
  const userAdd = async (newUSer, usersRec) => {
    try {
      let userResolve = await newUSer.save();
      usersRec.push(userResolve);
    } catch (err) {
      console.log(err);
    }
  };
  userAdd(newUSer, usersRec);
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
  // console.log(usersRec);
  // console.log(usersProfile);
  console.log("total users: ", usersRec.length);
};
adding();
