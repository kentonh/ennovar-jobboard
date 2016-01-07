/*<!--
Zachary Pearson
1/7/2016
-->*/

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
      /*if(typeof Session.get('listings') == "undefined")
      {
        Session.set('listings')
      }
      var listing = {};
      listing["title"]= e.target.title.value;
      listing["description"]=e.target.description.value;
      listing["perks"]=e.target.perks.value;
      switch (e.target.category.value)
      {
        case "one":listing["category"]="Category 1"; break;
        case "two":listing["category"]="Category 2"; break;
        case "three":listing["category"]="Category 3"; break;
        case "four":listing["category"]="Category 4"; break;
        case "five":listing["category"]="Category 5"; break;
      }
      if(e.target.apply.value=="website")
      {
        listing["appsite"]= true;
        listing["website"]= e.target.app_URL.value;
      }else{
        listing["appsite"]= false;
        listing["website"]= "N/A";
      }*/
    }
  });
}
