/*
Author: David Wibowo
Created: [01/07/2016]
Title:  homepage
Associated Files: homepage.html, homepage.js and homepage.css
*/

Template.homepage.helpers({
  categories:[{
    name:"Programing",
    number:"4",
    type:"list",
    link:"http://jobs.devict.org/categories/1/programming"
  },{
    name:"Design",
    number:"6",
    type:"active",
    link:"http://jobs.devict.org/categories/2/design"
  },{
    name:"Business Development",
    number:"3",
    type:"list",
    link:"http://jobs.devict.org/categories/3/business"
  },{
    name:"IT Admin",
    number:"8",
    type:"active",
    link:"http://jobs.devict.org/categories/4/it-admin"
  },{
    name:"Support",
    number:"0",
    type:"list",
    link:"http://jobs.devict.org/categories/6/support"
  },{
    name:"Marketing",
    number:"0",
    type:"active",
    link:"http://jobs.devict.org/categories/5/marketing"
  }],

  listing: [{
   url:"http://jobs.devict.org/jobs/60523/net-developer-at-high-touch-technologies",
   title:".NET Developer",
   company:"High Touch Technologies",
   category:"Design",
   status: "",
   date:"Dec 19"
 },{
   url:"http://jobs.devict.org/jobs/60523/net-developer-at-high-touch-technologies",
   title:"PHP Developer",
   company:"Power Developer Forward",
   category:"Programing",
   status:"Expired",
   date:"Nov 1"
 },{
   url:"http://jobs.devict.org/jobs/60523/net-developer-at-high-touch-technologies",
   title:".NET Developer",
   company:"High Touch Technologies",
   category:"Design",
   status: "",
   date:"Dec 19"
  }]
});
