Jobs = new Mongo.Collection("jobs");

if (Meteor.isServer) {
  Meteor.publish("jobs", function(){
    return Jobs.find();
  })
}

Meteor.methods({
  addJob: function(title, company, category, description, perks){
    //Make sure user is logged in before inserting a task
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    Jobs.insert({
      title: title,
      company: company,
      category: category,
      description: description,
      perks: perks,
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
  }
});
