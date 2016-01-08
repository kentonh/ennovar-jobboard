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
      switch (e.target.category.value)
      {
        case "one":
          category = "Category 1";
          break;
        case "two":
          category = "Category 2";
          break;
        case "three":
          category = "Category 3";
          break;
        case "four":
          category = "Category 4";
          break;
        case "five":
          category = "Category 5";
          break;
      }
      if(e.target.apply.value=="website")
      {
        isEmail = false;
        url = e.target.app_URL.value;
      }else{
        isEmail = true;
        url = Meteor.user().emails[0]["address"];
      }

      event.preventDefault();
      Meteor.call("addJob", title, company, category, description, perks, isEmail, url, function(error, result){
        console.log(result);
        Router.go("/view/" + result)
      });
    }
  });
}
