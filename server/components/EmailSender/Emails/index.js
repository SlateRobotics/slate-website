fs = require('fs');

module.exports = {
    OrderPlaced: fs.readFileSync(__dirname + "/OrderPlaced.html", "utf8"),
    ReservationPlaced: fs.readFileSync(__dirname + "/ReservationPlaced.html", "utf8"),
}
