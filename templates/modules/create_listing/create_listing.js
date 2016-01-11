/*
** Author: Zachary Pearson
** Created: 1/7/2016
*/

if (Meteor.isClient)
{
  Template.create_listing.events({
    'click .applyByWebsite': function (e, t) {
      $('.applicationURL').css("display","block");
    },
    'click .applyByEmail': function (e, t) {
      $('.applicationURL').css("display","none");
    },
    'submit form':function(e,t){
      title = e.target.title.value;
      company = e.target.company.value
      description = e.target.description.value;
      perks = e.target.perks.value;
      var category;
      var color;
      switch (e.target.category.value)
      {
        case "one":
          category = "Programming";
          color = "red";
          break;
        case "two":
          category = "Design";
          color = "#FF6600";
          break;
        case "three":
          category = "Business Development";
          color = "yellow";
          break;
        case "four":
          category = "IT Admin / Support";
          color = "green";
          break;
        case "five":
          category = "Marketing";
          color = "blue";
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
        console.log(result);
        Router.go("/view/" + result)
      });
    }
  });
}
