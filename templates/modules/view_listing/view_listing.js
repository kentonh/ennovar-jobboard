/*<!--
Zachary Pearson
1/7/2016
-->*/
if (Meteor.isClient){
  Template.view_listing.events({
    'click button':function(e,t){
    }
  }),
  Template.view_listing.helpers({
    title: function(){
      return "[TITLE YO]";
    },

    description: function(){
      return "[Description: ITS A JOB, MAN!]";
    },

    perks: function(){
      return "[Perks: YOU GET ALL KINDS OF MONEY!!!]";
    },

    category: function(){
      return "[Category: COMPUTERS]";
    },
    company: function(){
      return "[Company]";
    },
    published: function(){
      return "[Date]"
    }
  })
}
