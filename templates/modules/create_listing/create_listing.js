/*
** Author: Zachary Pearson
** Created: 1/7/2016
*/

if (Meteor.isClient)
{
  Template.create_listing.onRendered(function(){
    var url = window.location.pathname;
    urlArray = url.split('/');
    if(urlArray[1] == "edit"){
      job = Jobs.find({_id: urlArray[2]}).fetch();
      if(job[0].owner != Meteor.userId()){
        alert("You are not the owner of this job listing");
        window.location.href="/view/" + urlArray[2];
      }
      else{
        $('input[name=title]').val(job[0].title);
        $('input[name=company]').val(job[0].company);
        $('textarea[name=description]').val(job[0].description);
        $('textarea[name=perks]').val(job[0].perks);
        $('input[name=app_URL]').val(job[0].url);
        switch(job[0].category){
          case "Programming":
            $('input[name=category][value=one]').prop("checked", true);
            break;
          case "Design":
            $('input[name=category][value=two]').prop("checked", true);
            break;
          case "Business Development":
            $('input[name=category][value=three]').prop("checked", true);
            break;
          case "IT Admin / Support":
            $('input[name=category][value=four]').prop("checked", true);
            break;
          case "Marketing":
            $('input[name=category][value=five]').prop("checked", true);
            break;
        }
        if(job[0].isEmail){
          $('input[name=apply][value=email]').prop("checked", true);
        }
        else{
          $('input[name=apply][value-website]').prop("checked", true);
          $('.applicationURL').css("display","block")
        }
      }
    }
  })

  Template.create_listing.events({
    'click .applyByWebsite': function (e, t) {
      $('.applicationURL').css("display","block");
    },
    'click .applyByEmail': function (e, t) {
      $('.applicationURL').css("display","none");
    },
    'submit form':function(e,t){
      var titleEntered = false;
      var companyEntered = false;
      var descriptionEntered = false;
      title = e.target.title.value;
      company = e.target.company.value;
      description = e.target.description.value;
      perks = e.target.perks.value;
      var category;
      var color;
      if(title !=""){
        titleEntered = true;
      }
      if(company!=""){
        companyEntered = true;
      }
      if(description!=""){
        descriptionEntered = true;
      }
      var catSelected = false;
      switch($('input[name=category]:checked').val())
      {
        case "one":
          category = "Programming";
          color = "#FF0000";
          catSelected = true;
          break;
        case "two":
          category = "Design";
          color = "#FF6600";
          catSelected = true;
          break;
        case "three":
          category = "Business Development";
          color = "#009900";
          catSelected = true;
          break;
        case "four":
          category = "IT Admin / Support";
          color = "#0000FF";
          catSelected = true;
          break;
        case "five":
          category = "Marketing";
          color = "#6600CC";
          catSelected = true;
          break;
      }

      var appMethod = false;
      if($('input[name=apply]:checked').val() == "website")
      {
        isEmail = false;
        url = e.target.app_URL.value;
        if (url.search(/^http[s]?\:\/\//) == -1) {
          url = 'http://' + url;
        }
        appMethod = true;
      } else if($('input[name=apply]:checked').val() == "email"){
        isEmail = true;
        url = Meteor.user().emails[0]["address"];
        appMethod = true;
      }
      e.preventDefault();
      if(appMethod && catSelected && titleEntered && companyEntered && descriptionEntered){
        var currentUrl = window.location.pathname;
        urlArray = currentUrl.split('/');
        if(urlArray[1] == "create"){

          Meteor.call("addJob", title, company, category, color, description, perks, isEmail, url, function(error, result){
            //Redirect to view listing
            Router.go("/view/" + result)
          });
        }
        else{
          Meteor.call("editJob", urlArray[2], title, company, category, color, description, perks, isEmail, url, function(error, result){
            Router.go("/view/" + result)
          });
        }
      }else{
        var string = "Please Ensure the following fields are completed:\n\n";
        if(!titleEntered){ string = string+"-Job Title\n";}
        if(!companyEntered){ string = string+"-Company Name\n";}
        if(!descriptionEntered){string = string+"-Job Description\n";}
        if(!catSelected){string = string+"-Job Category\n";}
        if(!appMethod){string = string+"-Application Method\n";}
        alert(string);
      }
    }
  });
}
