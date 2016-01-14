/*
** Last Revision: 1/8/16
**
*/

Router.route('/', function(){
  this.layout('main');
  this.render('homepage');
});

Router.route('/create', function() {
  this.layout('main');
  this.render('create_listing');
});

Router.route('/authCheck', function() {
  this.layout('main');
  this.render('auth_check');
});

Router.route('/view/:id', function() {
  this.layout('main');
  this.render('view_listing');
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
