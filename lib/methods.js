Jobs = new Mongo.Collection("jobs");

if (Meteor.isServer) {
  Meteor.publish("jobs", function(){
    return Jobs.find();
  })
}

if (Meteor.isClient){
  Meteor.subscribe("jobs");
}

Meteor.methods({
  addJob: function(title, company, category, color, description, perks, isEmail, url){
    //Make sure user is logged in before inserting a task
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    return Jobs.insert({
      title: title,
      company: company,
      category: category,
      color: color,
      description: description,
      perks: perks,
      isEmail: isEmail,
      url: url,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteJob: function(jobId){
    if(Meteor.userId() != Jobs.find({ _id: jobId}).owner){
      throw new Meteor.Error("not-authorized");
    }
    Jobs.remove(jobId);
  },
  renewJob: function(jobId){
    Jobs.update(jobId, { $set: { createdAt: new Date()} });
  },

  // Clears the entire database
  clearDB: function() {
    return Jobs.remove({});
  }
});
