fs = require('fs');

module.exports = {
    OrderPlaced: fs.readFileSync(__dirname + "/OrderPlaced.html", "utf8"),
}
