Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://kentonh:' + process.env.MPW + '@smtp.sendgrid.net:587';
  console.log(process.env.MAIL_URL);
});
