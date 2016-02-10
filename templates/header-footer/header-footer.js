

function resizeDiv() {
  vpw = $(window).width();
  menusizemax= 875;
  min = parseInt($(".hdr").css("min-width"));

  if (vpw >= menusizemax) {
    if ($("#search:focus").size() == 1) {  // run this if user set focus on search box
        $("#searchbox").width($(window).width()-260-$("#rightbox").width());
    }
    $("#rightbox").show();
    $("#menu").hide();
  } else {
    $("#rightbox").hide();
    $("#menu").show();
    if (vpw > min && vpw < menusizemax && $("#search:focus").size() == 1) {
      $("#searchbox").width($(window).width()-295);
    }
  }
  //document.getElementById('search').value = vpw +" "+ min;
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
        $('.Search-case').css("display", "block");
      }
      if(text == '')
      {
        $('#Search').css('display', 'none');
        $('.Search-case').css("display", "none");
      }
    }
  },

  window.onresize = function(event) {
     resizeDiv();
  },

  Template.header.events({
    "blur #search": function () {
      $("#searchbox").width(200);
      $("#icon").show();
    },
    "focus #search": function () {
      menusizemax= 875;
      min = parseInt($(".hdr").css("min-width"));
      $("#icon").hide();
      vpw = $(window).width();
      if (vpw >= menusizemax) {
        $("#searchbox").width($(window).width()-260-$("#rightbox").width());
      } else {
        if (vpw > min && vpw < menusizemax) {
          $("#searchbox").width($(window).width()-295);
        } else {
          $("#searchbox").width(200);
        }
      }
    }
  });
}
