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
      Router.go('/edit/' + job[0]._id);
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
    },
    'click #emailform': function() {
      $('.emailForm').show();
      $('#name').focus();
    },
    'click .close': function() {
      $('.emailForm').hide();
    },
    'click #submit': function(e) {
      if ($('#name').val().trim().length > 0 && $('#email').val().trim().length > 0 &&
          $('#message').val().trim().length > 0 && $('#resumelink').val().trim().length > 0) {
        e.preventDefault();

        //Get owner email
        var currentUrl = window.location.pathname;
        urlArray = currentUrl.split('/');
        job = Jobs.find({_id: urlArray[2]}).fetch();
        ownerId = job[0].owner
        var sendTo = Meteor.users.find(ownerId).fetch()[0].emails[0].address;

        //Pull info from text boxes
        var applicationEmail = $('#email').val();
        var subject = $('#name').val() + " - DevICT Application for " + job[0].title;
        var content = $('#name').val() + ' has applied for your DevICT Job Listing for "' + job[0].title + '"\n' +
                    'Your listing: ' + window.location.href + "\n\n" +
                    '"' + $('#message').val() + '"\n\n';
        if($('#phone').val().trim().length > 0){
          content += $('#name').val() + " can be contacted at " + $('#phone').val() + " or by replying to this email.\n\n";
        }
        var resume = $('#resumelink').val();

        //Send email
        Meteor.call('sendEmail', sendTo, applicationEmail, subject, content, resume);

        //clear and hide form
        $('#name').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#message').val('');
        $('#resumelink').val('');
        $('.emailForm').hide();
        alert("Application successfully sent!");
      } else {
        alert("Name, Email, Message, and Resume link are required");
      }
    },
  })
}
