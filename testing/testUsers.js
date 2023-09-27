///This script generates and adds arbitrary demo users to the database

const userModel = require("../lib/models/userModel");

userModel.register({username: "geoffry", active: false}, 'password123');
userModel.register({username: "billy", active: false}, 'superSecure69');

