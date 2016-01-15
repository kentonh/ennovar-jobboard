/*
** Author: Zachary Pearson
** Created: 1/7/2016
*/

if (Meteor.isClient){
  Template.view_listing.helpers({
    job: function(){
      jobId = Router.current().params.id;
      return Jobs.find(jobId).fetch();
    },
    isOwner: function(){
      var currentUrl = window.location.pathname;
      urlArray = currentUrl.split('/');
      job = Jobs.find({_id: urlArray[2]}).fetch();
      if(job[0].owner != Meteor.userId()){
        return false;
      }
      else{
        return true;
      }
    }
  });

  Template.view_listing.events({
    'click .renew-btn': function(){
      var currentUrl = window.location.pathname;
      urlArray = currentUrl.split('/');
      job = Jobs.find({_id: urlArray[2]}).fetch();
      Meteor.call('renewJob', job[0]._id);
    },
    'click .edit-btn': function(){
      var currentUrl = window.location.pathname;
      urlArray = currentUrl.split('/');
      job = Jobs.find({_id: urlArray[2]}).fetch();
      Router.go('/edit/', job[0]._id);
    },
    'click .delete-btn': function(){
      $('.confirm').show();
    },
    'click .yes-btn': function(){
      var currentUrl = window.location.pathname;
      urlArray = currentUrl.split('/');
      job = Jobs.find({_id: urlArray[2]}).fetch();
      Meteor.call('deleteJob', job[0]._id);
      Router.go('/');
    },
    'click .no-btn': function(){
      $('.confirm').hide();
    }
  })
}
