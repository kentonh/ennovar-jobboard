/*
** Last Revision: 1/8/16
**
*/

Router.route('/', function(){
  this.layout('main');
  this.render('homepage');
});

Router.route('/create', {
  onBeforeAction: function() {
    if(!Meteor.loggingIn() && !Meteor.user()) {
      alert("Please sign-in or create an account first.");
      this.redirect('/');
    }
    this.next();
  },
  action: function(){
    this.layout('main');
    this.render('create_listing');
  }
});

Router.route('/view/:id', {
  waitOn: function(){
    return Meteor.subscribe("jobs");
  },
  action: function(){
    this.layout('main');
    this.render('view_listing');
  }
});

Router.route('/edit/:id', {
  waitOn: function(){
    return Meteor.subscribe("jobs");
  },
  action: function(){
    this.layout('main');
    this.render('create_listing');
  }
});
