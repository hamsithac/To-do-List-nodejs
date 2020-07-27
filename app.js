//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

var items=["wake-up", "eat" ,"sleep"];
var workitems=[];

app.get("/", function(req, res) {
  const today = new Date();
  const options={
    weekday:"long",
    month: "long",
    day: "numeric"
  }

  var day=today.toLocaleDateString("en-US",options);
  res.render("list", {
      title: day,
      newlistitems: items
  });
});

app.post("/", function(req, res){
  var item=  req.body.newitem;
  console.log(req.body.list);
  if(req.body.list === "work"){
      workitems.push(item);
      res.redirect("/work");
  }else{
    items.push(item);
   res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list",{
    title: "work",
    newlistitems: workitems
  });
});

app.post("/work", function(req,res){
var item =  req.body.newitem;
 workitems.push(item);
res.redirect("/work");
})

app.listen(3000, function() {
  console.log("server running on port 3000");
})
