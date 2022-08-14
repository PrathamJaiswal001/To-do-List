const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items=["Buy Food","Cook Food","Eat Food"];

const workItems = [];

app.get("/", function (req, res) {
    const today = new Date();
     
    const options ={
        weekday : "long",
        day : "numeric",
        month : "long"
    };

    const day = today.toLocaleDateString("en-US",options);

    res.render("list", {listTitle: day , newListItems: items});
})

app.post("/" ,function(req,res){
   const item = req.body.newItem;
   if(req.body.list === "work"){ 
       workItems.push(item);
       res.redirect("/work");
   }else{
    items.push(item);
    res.redirect("/");
   }
  

})

app.get("/about",function(req,res){
    res.render("about");
})

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List", newListItems: workItems })
})


app.listen(5000, function () {
    console.log("Server running on port 5000");
})