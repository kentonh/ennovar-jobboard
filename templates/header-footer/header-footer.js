
function resizeDiv() {
vpw = $(window).width();
vph = $(window).height();
//$(‘#somediv’).css({‘height’: vph + ‘px’});

  if (vpw < 1660 && vpw >= 780) {
    p = 10+40*(vpw-780)/(1660-780);
    document.getElementById("searchbox").style.width = p+"%";
    document.getElementById("rightbox").style.display ='block';
    document.getElementById("menu").style.display ='none';

  } else {
    if (vpw < 780) {
      document.getElementById("rightbox").style.display ='none';
      document.getElementById("menu").style.display ='block';
      m = 35+30*(vpw-300)/(780-300);
      document.getElementById("searchbox").style.width = m+"%";
    } else {
      document.getElementById("menu").style.display ='none';
    }
  }
//  document.getElementById('search').value = vpw;
}

if(Meteor.isClient)
{
  Template.header.onRendered(function(){
    resizeDiv();
  }),
  window.onload = function(event) {
//    resizeDiv();
  },
  search = function() {
    var criteria = Session.get('criteria');
    if(criteria != undefined)
    {
      if(window.location.pathname  != '/')
      {
        window.location.href = "/";
      }
      var text = document.getElementById('search').value;
      Session.set('criteria', text);
    }
  },

  window.onresize = function(event) {
    resizeDiv();
  }
}
