fs = require('fs');

module.exports = {
    OrderPlaced: fs.readFileSync(__dirname + "/OrderPlaced.html", "utf8"),
    ReservationPlaced: fs.readFileSync(__dirname + "/ReservationPlaced.html", "utf8"),
    UserSetupRequest: fs.readFileSync(__dirname + "/UserSetupRequest.html", "utf8"),
    PasswordReset: fs.readFileSync(__dirname + "/PasswordReset.html", "utf8"),
    ApplicationReceived: fs.readFileSync(__dirname + "/ApplicationReceived.html", "utf8"),
    NewComment: fs.readFileSync(__dirname + "/NewComment.html", "utf8"),
    NewCommentAnswer: fs.readFileSync(__dirname + "/NewCommentAnswer.html", "utf8"),
    NewAnswer: fs.readFileSync(__dirname + "/NewAnswer.html", "utf8"),
    CommentMention: fs.readFileSync(__dirname + "/CommentMention.html", "utf8"),
}
