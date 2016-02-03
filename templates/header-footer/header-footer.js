
function resizeDiv() {
  vpw = $(window).width();

  if (vpw >= 780) {
    if ($("#search:focus").size() == 1) {  // run this if user set focus on search box
        $("#searchbox").width($(window).width()-260-$("#rightbox").width());
    }
    $("#rightbox").show();
    $("#menu").hide();
  } else {
    $("#rightbox").hide();
    $("#menu").show();
    if (vpw > 300 && vpw < 780 && $("#search:focus").size() == 1) {
      $("#searchbox").width($(window).width()-325);
    }
  }
//  document.getElementById('search').value = vpw +" "+rb;
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
  },

  Template.header.events({
    "blur #search": function () {
      $("#searchbox").width(50);
      $("#icon").show();
    },
    "focus #search": function () {
      $("#icon").hide();
      vpw = $(window).width();
      if (vpw >= 780) {
        $("#searchbox").width($(window).width()-260-$("#rightbox").width());
      } else {
        if (vpw > 300 && vpw < 780) {
          $("#searchbox").width($(window).width()-325);
        } else {
          $("#searchbox").width(50);
        }
      }
    }
  });
}
