function getrightboxwidth() {


}
function resizeDiv() {
vpw = $(window).width();
vph = $(window).height();
rb = $("#rightbox").width();  // get the width value of rightbox

if (rb < 264)  // not sure why not reading the corect width
  rb = 264;

  if (vpw >= 780) {
    p= vpw-260-rb;
    document.getElementById("searchbox").style.width = p+"px";
    document.getElementById("rightbox").style.display ='block';
    document.getElementById("menu").style.display ='none';

  } else {
    if (vpw >450 && vpw < 780) {
      m= vpw - 325;
      document.getElementById("rightbox").style.display ='none';
      document.getElementById("menu").style.display ='block';
      document.getElementById("searchbox").style.width = m+"px";
    } else {
      document.getElementById("searchbox").style.width = "125px";
      document.getElementById("menu").style.display ='block';
    }
  }
//  document.getElementById('search').value = vpw +" "+ m +" "+rb;
}

if(Meteor.isClient)
{
  Template.header.onRendered(function(){
    if(Session.get('criteria') == undefined)
    {
      Session.set('criteria', []);
    }
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
      Session.setPersistent('criteria', text);
      if(text != '')
      {
        $('#Search').css('display', 'inline-block');
        $('.Search-dot').css("display", "block");
      }
      if(text == '')
      {
        $('#Search').css('display', 'none');
      }
    }
  },

  window.onresize = function(event) {
    resizeDiv();
  }
}
