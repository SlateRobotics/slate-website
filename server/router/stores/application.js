var JobApp = require('../../models/application');
var EmailSender = require('../../components/EmailSender');
var express = require('express');
var router = express.Router();

router.post('/application', function (req, res) {
  var jobApp = new JobApp();
  jobApp.position = req.body.application.position;
  jobApp.name = req.body.application.name;
  jobApp.email = req.body.application.email;
  jobApp.phone = req.body.application.phone;
  jobApp.questions = [];

  if (!req.body.application.questions) req.body.application.questions = [];
  for (var i = 0; i < req.body.application.questions.length; i++) {
    jobApp.questions.push({
      type: req.body.application.questions[i].type,
      name: req.body.application.questions[i].name,
      answer: req.body.application.questions[i].answer,
    });
  }

  jobApp.save(function (err) {
    if (err) {
      res.json({success: false, message: err});
    } else {
      res.json({success: true});

      var jobAppHtml = "";
      jobAppHtml += "<p>Name: " + jobApp.name + "</p>"
      jobAppHtml += "<p>Email: " + jobApp.email + "</p>"
      jobAppHtml += "<p>Phone: " + jobApp.phone + "</p>"
      for (var i = 0; i < jobApp.questions.length; i++) {
        var questionHtml = "";
        questionHtml += "<div style=\"marginBottom:15px\">";
        questionHtml += "<h3>" + jobApp.questions[i].name + "</h3>";
        questionHtml += "<p>" + jobApp.questions[i].answer + "</p>";
        questionHtml += "</div>";
        jobAppHtml += questionHtml;
      }

      var html = EmailSender.Emails.ApplicationReceived
        .replace(new RegExp("__POSITION__", 'g'), jobApp.position)
        .replace(new RegExp("__APPLICATION__", 'g'), jobAppHtml);
      var emailSender = new EmailSender({
        from: "zach@slaterobots.com",
        to: jobApp.email,
        bcc: "zach@slaterobots.com",
        subject: "Slate Robotics - Application Received",
        html: html,
      });
      emailSender.send();
    }
  })

});

module.exports = router;
