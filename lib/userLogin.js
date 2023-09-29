const userModel = require("./mongooseModels/userModel");

let methods = {
    doesUserExist: function (inputUsername) {
        return userModel.findOne({username:inputUsername}).count();
    }

}



module.exports = methods

