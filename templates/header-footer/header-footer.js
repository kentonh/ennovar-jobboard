
if(Meteor.isClient)
{
  search = function() {
    var criteria = Session.get('criteria');
    if(criteria != undefined)
    {
      if(window.location.pathname != '/')
      {
        window.location.href = "/";
      }
      var text = document.getElementById('search').value;
      Session.set('criteria', text);
    }
  }
}
