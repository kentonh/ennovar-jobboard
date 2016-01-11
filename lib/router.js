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

Router.route('/view/:id', function() {
  this.layout('main');
  this.render('view_listing');
});
