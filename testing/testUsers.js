///This script generates and adds arbitrary demo users to the database

const userModel = require("../lib/mongooseModels/userModel");
const userLogin = require("../lib/userLogin")

//userModel.register({username: "geoffry", active: false}, 'password123');
//userModel.register({username: "billy", active: false}, 'superSecure69');
//userModel.register({username: "samwise", active: false, uuid:'bhkehwkle3'}, 'blinkus180tinkus');
console.log(userLogin.doesUserExist("goeffry"));

