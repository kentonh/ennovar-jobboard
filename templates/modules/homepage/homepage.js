/*
Author: David Wibowo
Created: [01/07/2016]
Title:  homepage
Associated Files: homepage.html, homepage.js and homepage.css
*/
if(Meteor.isClient)
{
  Template.homepage.onRendered(function()
    {
      $('.Search-dot').css("display", "block");
      Session.set('categories', []);
      Session.set('criteria', []);
      if(Session.get('criteria').length == 0)
      {
        $('#Search').css('display', 'none');
      }
    })

  Template.homepage.helpers({
    loggedIn: function(){
      if(!Meteor.userId()){
        return false;
      }
      return true;
    },
    userNumber: function(){
      if(!Meteor.userId()){
        return 0;
      }
      else{
        return Jobs.find({owner: Meteor.userId()}).count();
      }
    },
    categories:[{
      name: "Programming",
      short: "Programming",
      number: function() {
        return Jobs.find({category: "Programming"}).count();
      },
      color: "#FF0000"
    },{
      name: "Design",
      short: "Design",
      number: function() {
        return Jobs.find({category: "Design"}).count();
      },
      color: "#FF6600"
    },{
      name:"Business Development",
      short: "Business",
      number: function() {
        return Jobs.find({category: "Business Development"}).count();
      },
      color: "#009900"
    },{
      name: "IT Admin / Support",
      short: "IT",
      number: function() {
        return Jobs.find({category: "IT Admin / Support"}).count();
      },
      color: "#0000FF"
    },{
      name:"Marketing",
      short: "Marketing",
      number: function() {
        return Jobs.find({category: "Marketing"}).count();
      },
      color: "#6600CC"
    },
    {
      name:function() {
        var name = "Search: ";
        var data = Session.get('criteria');
        if(data != undefined)
        {
          name += data;
        }
          return name;
      },
      short: 'Search',
      number: '',
      color: 'grey'
    }],

    listing: function() {
      categories = Session.get('categories');
      criteria = Session.get('criteria');
      userRequired = false;

      if(categories != undefined)
      {
        for(var i = 0; i < categories.length; i++)
        {
          if(categories[i] == "User")
          {
            userRequired = true;
          }
        }

        // Only show users listings
        if(userRequired)
        {
          // Categories selected
          if(categories.length > 1)
          {
            // Search Criteria selected
            if(criteria.length != 0)
            {
              // Category, Search, User
              keyword = new RegExp(criteria, 'i');
              return Jobs.find({$and: [{'owner': Meteor.userId()},{$or: [{'title': {$regex: keyword}},{'company': {$regex: keyword}}, {'description': {$regex: keyword}}]}, {'category': {$in: categories}}]},{sort: {createdAt: -1}}).fetch();
            }
            else
            {
              // Category, No Search, User
              return Jobs.find({$and: [{'owner': Meteor.userId()},
              {'category': {$in: categories}}]},
              {sort: {createdAt: -1}}).fetch();
            }
          }
          // No Categories selected
          else
          {
            // Search Criteria selected
            if(criteria.length != 0)
            {
              // No Category, Search, User
              keyword = new RegExp(criteria, 'i');
              return Jobs.find({$and: [{'owner': Meteor.userId()},
              {$or: [{'title': {$regex: keyword}},{'company': {$regex: keyword}},
              {'description': {$regex: keyword}}]}]},
              {sort: {createdAt: -1}}).fetch();
            }
            // No Search Criteria selected
            else
            {
              // No Category, No Search, User
              return Jobs.find({'owner': Meteor.userId()},
              {sort: {createdAt: -1}}).fetch();
            }
          }
        }
        // Show all unexpired listings
        else
        {
          // Categories selected
          if(categories.length > 0)
          {
            // Search Criteria selected
            if(criteria.length != 0)
            {
              // Category, Search, No User
              console.log('Category, Search, No User');
              keyword = new RegExp(criteria, 'i');
              return Jobs.find({$and: [{$or: [{'owner': Meteor.userId()}, {'isExpired': false}]},{$or: [{'title': {$regex: keyword}},{'company': {$regex: keyword}}, {'description': {$regex: keyword}}]}, {'category': {$in: categories}}]},{sort: {createdAt: -1}}).fetch();
            }
            else
            {
              // Category, No Search, No User
              return Jobs.find({$and: [{$or: [{'owner': Meteor.userId()},
              {'isExpired': false}]}, {'category': {$in: categories}}]},
              {sort: {createdAt: -1}}).fetch();
            }
          }
          // No Categories selected
          else
          {
            // Search Criteria selected
            if(criteria.length != 0)
            {
              // No Category, Search, No User
              keyword = new RegExp(criteria, 'i');
              return Jobs.find({$and: [{$or: [{'owner': Meteor.userId()},
              {'isExpired': false}]},{$or: [{'title': {$regex: keyword}},
              {'company': {$regex: keyword}}, {'description': {$regex: keyword}}]}]},
              {sort: {createdAt: -1}}).fetch();
            }
            // No Search Criteria selected
            else
            {
              // No Category, No Search, No User
              return Jobs.find(
                {
                  $or: [{'owner': Meteor.userId()}, {'isExpired': false}]
                },
                {
                  sort: {createdAt: -1}
                }
              ).fetch();
            }
          }
        }
      }

    //   if(categories != undefined)
    //   {
    //     for(var i = 0; i < categories.length; i++){
    //       if(categories[i] == "User"){
    //         userRequired = true;
    //       }
    //     }
    //     if(userRequired){
    //       if(categories.length == 1 && criteria.length == 0)
    //       {
    //         return Jobs.find({'owner': Meteor.userId()}, {sort: {createdAt: -1}}).fetch();
    //       }
    //       else if(criteria.length == 0)
    //       {
    //         return Jobs.find({$and: [{'owner': Meteor.userId()}, {'category': {$in: categories}}]}, {sort: {createdAt: -1}}).fetch();
    //       }
    //     }
    //     else{
    //       if(categories.length == 0 && criteria.length == 0)
    //       {
    //         return Jobs.find({$or: [{'owner': Meteor.userId()}, {'isExpired': false}]}, {sort: {createdAt: -1}}).fetch();
    //       }
    //       else if(criteria.length == 0)
    //       {
    //         return Jobs.find({$and: [{$or: [{'owner': Meteor.userId()}, {'isExpired': false}]}, {'category': {$in: categories}}]}, {sort: {createdAt: -1}}).fetch();
    //       }
    //     }
    //   }
    //   if(criteria != undefined)
    //   {
    //     if(criteria.length != 0)
    //     {
    //       var search = new RegExp(criteria, "i");
    //       return Jobs.find({$and: [{$or: [{'owner': Meteor.userId()}, {'isExpired': false}]}, {$or: [{'title': {$regex: search}}, {'company': {$regex: search}}, {'description': {$regex: search}}]} ]}, {sort: {createdAt: -1}}).fetch();
    //     }
    //   }
   }
  });

  Template.homepage.events({
    'click #Programming': function(e, t) {
      $('#Programming').toggleClass('red_fade');
      data = Session.get('categories');
      if(data.indexOf("Programming") == -1)
      {
        data.push('Programming');
        Session.set('categories', data);
      }
      else {
        index = data.indexOf('Programming');
        data.splice(index, 1);
        Session.set('categories', data);
      }
    },
    'click #Design': function(e, t) {
      $('#Design').toggleClass('orange_fade');
      data = Session.get('categories');
      if(data.indexOf("Design") == -1)
      {
        data.push('Design');
        Session.set('categories', data);
      }
      else {
        index = data.indexOf('Design');
        data.splice(index, 1);
        Session.set('categories', data);
      }
    },
    'click #Business': function(e, t) {
      $('#Business').toggleClass('green_fade');
      data = Session.get('categories');
      if(data.indexOf("Business Development") == -1)
      {
        data.push('Business Development');
        Session.set('categories', data);
      }
      else {
        index = data.indexOf('Business Development');
        data.splice(index, 1);
        Session.set('categories', data);
      }
    },
    'click #IT': function(e, t) {
      $('#IT').toggleClass('blue_fade');
      data = Session.get('categories');
      if(data.indexOf("IT Admin / Support") == -1)
      {
        data.push('IT Admin / Support');
        Session.set('categories', data);
      }
      else {
        index = data.indexOf('IT Admin / Support');
        data.splice(index, 1);
        Session.set('categories', data);
      }
    },
    'click #Marketing': function(e, t) {
      $('#Marketing').toggleClass('purple_fade');
      data = Session.get('categories');
      if(data.indexOf("Marketing") == -1)
      {
        data.push('Marketing');
        Session.set('categories', data);
      }
      else {
        index = data.indexOf('Marketing');
        data.splice(index, 1);
        Session.set('categories', data);
      }
    },
    'click #Search': function(e, t) {
      Session.set('criteria', []);
      $('#Search').css('display', 'none');
    },
    'click #User': function(e, t) {
      $('#User').toggleClass('user_fade');
      data = Session.get('categories');
      if(data.indexOf("User") == -1)
      {
        data.push('User');
        Session.set('categories', data);
      }
      else {
        index = data.indexOf('User');
        data.splice(index, 1);
        Session.set('categories', data);
      }
    },

    'click .home-tag': function(e,t){
      var dot = "."+$(e.target).attr('id')+"-dot";
      if($(dot).css("display") == "none"){
        $(dot).css("display", "block");
      }else{
        $(dot).css("display", "none");
      }

    },
    'click button': function(e,t){
      event.preventDefault();
    }
  });

  Handlebars.registerHelper("isOwner", function(owner){
    return Meteor.userId() == owner;
  })
}
