fs = require('fs');

module.exports = {
    OrderPlaced: fs.readFileSync(__dirname + "/OrderPlaced.html", "utf8"),
    ReservationPlaced: fs.readFileSync(__dirname + "/ReservationPlaced.html", "utf8"),
    UserSetupRequest: fs.readFileSync(__dirname + "/UserSetupRequest.html", "utf8"),
    PasswordReset: fs.readFileSync(__dirname + "/PasswordReset.html", "utf8"),
}
