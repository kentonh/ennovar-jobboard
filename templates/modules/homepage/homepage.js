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
    Session.set('criteria', []);
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
      categories = Session.get('categories');
      criteria = Session.get('criteria');
      if(categories != undefined)
      {
        if(categories.length == 0 && criteria.length == 0)
        {
          return Jobs.find({}, {sort: {createdAt: -1}}).fetch();
        }
        else if(criteria.length == 0)
        {
          return Jobs.find({category: {$in: categories}}, {sort: {createdAt: -1}}).fetch();
        }
      }
      if(criteria != undefined)
      {
        if(criteria.length != 0)
        {
          return Jobs.find({$or: [{'title': criteria}, {'company': criteria}]}, {sort: {createdAt: -1}}).fetch();
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
        Session.set('criteria', []);
      }
      else {
        index = data.indexOf('Programming');
        data.splice(index, 1);
        Session.set('categories', data);
        Session.set('criteria', []);
      }
    },
    'click #Design': function(e, t) {
      $('#Design').toggleClass('orange_fade');
      data = Session.get('categories');
      if(data.indexOf("Design") == -1)
      {
        data.push('Design');
        Session.set('categories', data);
        Session.set('criteria', []);
      }
      else {
        index = data.indexOf('Design');
        data.splice(index, 1);
        Session.set('categories', data);
        Session.set('criteria', []);
      }
    },
    'click #Business': function(e, t) {
      $('#Business').toggleClass('green_fade');
      data = Session.get('categories');
      if(data.indexOf("Business Development") == -1)
      {
        data.push('Business Development');
        Session.set('categories', data);
        Session.set('criteria', []);
      }
      else {
        index = data.indexOf('Business Development');
        data.splice(index, 1);
        Session.set('categories', data);
        Session.set('criteria', []);
      }
    },
    'click #IT': function(e, t) {
      $('#IT').toggleClass('blue_fade');
      data = Session.get('categories');
      if(data.indexOf("IT Admin / Support") == -1)
      {
        data.push('IT Admin / Support');
        Session.set('categories', data);
        Session.set('criteria', []);
      }
      else {
        index = data.indexOf('IT Admin / Support');
        data.splice(index, 1);
        Session.set('categories', data);
        Session.set('criteria', []);
      }
    },
    'click #Marketing': function(e, t) {
      $('#Marketing').toggleClass('purple_fade');
      data = Session.get('categories');
      if(data.indexOf("Marketing") == -1)
      {
        data.push('Marketing');
        Session.set('categories', data);
        Session.set('criteria', []);
      }
      else {
        index = data.indexOf('Marketing');
        data.splice(index, 1);
        Session.set('categories', data);
        Session.set('criteria', []);
      }
    },
  });
}
