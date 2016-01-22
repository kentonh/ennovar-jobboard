Jobs = new Mongo.Collection("jobs");

if (Meteor.isServer) {
  Meteor.publish("jobs", function(){
    return Jobs.find();
  })

  RssFeed.publish('jobs.rss', function(query){
    var self = this;

    self.setValue('title', self.cdata('DevICT Job Board'));
    self.setValue('description', self.cdata('Listings for Development jobs in the ICT area'));
    self.setValue('link', 'http://104.131.100.18/');
    self.setValue('lastBuildDate', new Date());
    self.setValue('pubDate', new Date());
    self.setValue('ttl', 1);


    Jobs.find({'isExpired': false}).forEach(function(doc){
      self.addItem({
        title: doc.title + ' - ' + doc.company,
        description: doc.category + ' - ' + doc.description,
        link: 'http://104.131.100.18/view/' + doc._id,
        pubDate: doc.createdAt
      });
    });
  });
}

if (Meteor.isClient){
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
    job = Jobs.find({ _id: jobId}).fetch();
    if(Meteor.userId() != job[0].owner){
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
  }
});
