Router.route('/', function(){
  this.layout("main");
  this.render("page");
})

Router.route('/create', function(){
  this.layout("main");
  this.render("create_listing");
})

Router.route('/view/:_id', function(){
  this.layout("main");
  this.render("view_listing");
})
