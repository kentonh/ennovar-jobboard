/*
Author: David Wibowo
Created: [01/07/2016]
Title:  homepage
Associated Files: homepage.html, homepage.js and homepage.css
*/
if(Meteor.isClient)
{
  Template.homepage.helpers({
    categories:[{
      name: "Programming",
      number: function() {
        return Jobs.find({category: "Category 1"}).count();
      },
      type: "inactive",
      color: "#FF0000"
    },{
      name: "Design",
      number: function() {
        return Jobs.find({category: "Category 2"}).count();
      },
      type: "active",
      color: "#FF6600"
    },{
      name:"Business Development",
      number: function() {
        return Jobs.find({category: "Category 3"}).count();
      },
      type:"inactive",
      color: "#FFFF00"
    },{
      name: "IT Admin",
      number: function() {
        return Jobs.find({category: "Category 4"}).count();
      },
      type: "active",
      color: "#009900"
    },{
      name:"Support",
      number: function() {
        return Jobs.find({category: "Category 5"}).count();
      },
      type:"inactive",
      color: "#0000FF"
    },{
      name:"Marketing",
      number:"0",
      type:"active",
      color: "#6600CC"
    }],

  listing: function() {
    return Jobs.find().fetch();
  }
  // {
  //    url:"http://jobs.devict.org/jobs/60523/net-developer-at-high-touch-technologies",
  //    title:".NET Developer",
  //    company:"High Touch Technologies",
  //    category:"Design",
  //    status: "",
  //    date:"Dec 19"
  //  },{
  //    url:"http://jobs.devict.org/jobs/60523/net-developer-at-high-touch-technologies",
  //    title:"PHP Developer",
  //    company:"Power Developer Forward",
  //    category:"Programing",
  //    status:"Expired",
  //    date:"Nov 1"
  //  },{
  //    url:"http://jobs.devict.org/jobs/60523/net-developer-at-high-touch-technologies",
  //    title:".NET Developer",
  //    company:"High Touch Technologies",
  //    category:"Design",
  //    status: "",
  //    date:"Dec 19"
  //   }
// ]
  });
}
