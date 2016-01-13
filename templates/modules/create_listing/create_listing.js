/*
** Author: Zachary Pearson
** Created: 1/7/2016
*/

if (Meteor.isClient)
{
  Template.auth_check.onCreated(function(){
    if(!Meteor.user()){
      alert("Please sign-in or create an account first.");
      window.location.href="/";
    }else{
      window.location.href = "/create";
    }
  }),

  Template.create_listing.events({
    'click .applyByWebsite': function (e, t) {
      $('.applicationURL').css("display","block");
    },
    'click .applyByEmail': function (e, t) {
      $('.applicationURL').css("display","none");
    },
    'submit form':function(e,t){
      title = e.target.title.value;
      company = e.target.company.value;
      description = e.target.description.value;
      perks = e.target.perks.value;
      var category;
      var color;
      switch (e.target.category.value)
      {
        case "one":
          category = "Programming";
          color = "#FF0000";
          break;
        case "two":
          category = "Design";
          color = "#FF6600";
          break;
        case "three":
          category = "Business Development";
          color = "#009900";
          break;
        case "four":
          category = "IT Admin / Support";
          color = "#0000FF";
          break;
        case "five":
          category = "Marketing";
          color = "#6600CC";
          break;
      }
      if(e.target.apply.value=="website")
      {
        isEmail = false;
        url = e.target.app_URL.value;
      } else {
        isEmail = true;
        url = Meteor.user().emails[0]["address"];
      }
      event.preventDefault();
      Meteor.call("addJob", title, company, category, color, description, perks, isEmail, url, function(error, result){
        Router.go("/view/" + result)
      });
    }
  });
}
