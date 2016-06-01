Jobs = new Mongo.Collection("jobs");

if (Meteor.isServer) {
  Meteor.publish("jobs", function(){
    return Jobs.find();
  });

  Meteor.publish("allUsers", function () {
    return Meteor.users.find();
  });

  RssFeed.publish('jobs.rss', function(query){
    var self = this;

    self.setValue('title', self.cdata('DevICT Job Board'));
    self.setValue('description', self.cdata('Listings for Development jobs in the ICT area'));
    self.setValue('link', 'http://jobsinict.com/');
    self.setValue('lastBuildDate', new Date());
    self.setValue('pubDate', new Date());
    self.setValue('ttl', 1);


    Jobs.find({'isExpired': false}).forEach(function(doc){
      self.addItem({
        title: '<![CDATA[' + doc.title + ' - ' + doc.company + ']]>',
        description: '<![CDATA[' + doc.category + ' - ' + doc.description + ']]>',
        link: 'http://jobsinict.com/view/' + doc._id,
        guid: 'http://jobsinict.com/view/' + doc._id,
        pubDate: doc.createdAt
      });
    });
  });

  Meteor.methods({
    sendEmail: function(to, from, subject, text, resume){
      check([to, from, subject, text], [String]);

      this.unblock();

      attachments = [];
      //Check to see if resume is link or was uploaded
      if(typeof resume != "string"){
        attachments.push(resume);
      }

      //If resume is link
      if(attachments.length == 0){
        text += 'Resume available at ' + resume;
        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        })
      }
      //if resume was uploaded
      else{
        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text,
          attachments: attachments
        })
      }
    }
  });
}

if (Meteor.isClient){
  Meteor.startup(function(){
    Hooks.init();
  });

  Meteor.subscribe("jobs", function(){
    activeJobs = Jobs.find({'isExpired': false}).fetch();
    for(var i = 0; i < activeJobs.length; i++){
      currentDate = new Date();
      expirationDate = activeJobs[i].createdAt;
      expirationDate.setDate(expirationDate.getDate() + 60);
      if(currentDate > expirationDate){
        console.log("Expiring item ", i);
        Meteor.call("expireJob", activeJobs[i]._id);
      }
    }
  });
}

Meteor.methods({
  addJob: function(title, company, category, color, description, perks, isEmail, url){
    //Make sure user is logged in before inserting a task
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    return Jobs.insert({
      title: title,
      company: company,
      category: category,
      color: color,
      description: description,
      perks: perks,
      isEmail: isEmail,
      url: url,
      createdAt: today,
      day: dd,
      month: mm,
      isExpired: false,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  editJob: function(jobId, title, company, category, color, description, perks, isEmail, url){
      //Make sure user is logged in before inserting a task
      if(!Meteor.userId()){
        throw new Meteor.Error("not-authorized");
      }

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;

      Jobs.update(jobId, { $set: {
        title: title,
        company: company,
        category: category,
        color: color,
        description: description,
        perks: perks,
        isEmail: isEmail,
        url: url,
        createdAt: today,
        day: dd,
        month: mm,
        isExpired: false
      }
    });
    return jobId;
  },
  deleteJob: function(jobId){
    var loggedInUser = Meteor.user();
    job = Jobs.find({ _id: jobId}).fetch();
    if(Meteor.userId() != job[0].owner && !Roles.userIsInRole(loggedInUser, ['admin'])){
      throw new Meteor.Error("not-authorized");
    }
    Jobs.remove(jobId);
  },
  renewJob: function(jobId){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    Jobs.update(jobId, { $set: { createdAt: today, day: dd, month: mm, isExpired: false } });
  },
  expireJob: function(jobId){
    Jobs.update(jobId, { $set: { isExpired: true } });
  },
  grantAdmin: function(userId){
    var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error(403, "Access denied");
    }
    Roles.setUserRoles(userId, ['admin']);
  },
  firstAdmin: function(userId){
    if(Roles.getUsersInRole('admin').count() == 0){
      Roles.setUserRoles(userId, ['admin']);
    }
    else{
      throw new Meteor.Error(403, "Access denied");
    }
  },
  getEmails: function(){
    var loggedInUser = Meteor.user();
    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
      throw new Meteor.Error(403, "Access denied");
    }

    userList = Meteor.users.find().fetch();
    emailList = ["User ID, Email"];
    for(var i = 0; i < userList.length; i++){
      emailList.push(userList[i]["_id"] + "," + userList[i]["emails"][0]["address"]);
    }
    csvContent = "data:text/csv;charset=utf-8," + emailList.join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "devictemail.csv");
    link.click();
  }
});
