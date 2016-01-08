/*
** Last Revision: 1/8/16
**
*/

Router.route('/', function(){
  this.layout('main');
  this.render('page');
});

Router.route('/create', function() {
  this.layout('main');
  this.render('create_listing');
});

Router.route('/view', function() {
  this.layout('main');
  this.render('view_listing');
});
