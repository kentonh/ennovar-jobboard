/*<!--
Zachary Pearson
1/7/2016
-->*/
if (Meteor.isClient){
  Template.view_listing.events({
    'click button':function(e,t){
    }
  }),
  Template.view_listing.helpers({
    job: function(){
      jobId = Router.current().params.id;
      return Jobs.find(jobId);
    }
  })
}
