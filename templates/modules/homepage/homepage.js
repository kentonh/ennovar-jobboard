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
    Session.set('categories', []);
  })

  Template.homepage.helpers({
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
    }],

    listing: function() {
      data = Session.get('categories');
      if(data != undefined)
      {
        if(data.length == 0)
        {
          return Jobs.find({}, {sort: {createdAt: -1}}).fetch();
        }
        else
        {
          return Jobs.find({category: {$in: data}}, {sort: {createdAt: -1}}).fetch();
        }
      }
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

    'click .home-tag': function(e,t){
      var dot = "."+$(e.target).attr('id')+"-dot";

      if($(dot).css("display") == "none"){
        $(dot).css("display", "block");
      }else{
        $(dot).css("display", "none");
      }

    },
  });
}
