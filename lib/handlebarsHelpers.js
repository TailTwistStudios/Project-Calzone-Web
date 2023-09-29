const users = require("./users");


function init(handlebars) {
    handlebars.handlebars.registerHelper('playerCount', function() {
        return users.getUserCount();
    })
}




module.exports = { init };
