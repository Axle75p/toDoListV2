//jshint esversion:6

const express = require('express');  //req express lib
const bodyParser = require('body-parser'); // req bp lib

const app = express();

let items = [];
let workItems =[];

app.set('view engine', 'ejs');
/* app.set('view engine', 'ejs'); */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

///--------current day of the week at h1-------------////////
app.get("/", function(req, res){ //get response when user request "/" - home route

    let today = new Date(); //  new Date object associated with var today

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
/* 1st */

let day = today.toLocaleDateString("en-US", options); //toLocaleDateString- method of Date obj wich show human readed date with choosen options 

res.render("list", {listTitle: day, newListItems: items }); // kindOfDay -obj we put in ejs, day -var from appjs wich render in list.ejs

});
///--------current day of the week at h1------- end------////////

app.post ("/", function (req, res){
    
    let item = req.body.newItem;
    
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }

});


app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function(req,res){
    res.render("about");
})


app.listen(3000, function(){                        //listen localhost:3000
    console.log("server started on port 3000");
})


/* 1st var currentDay = today.getDay(); // getDay() method of object Day calculate current day
var day = "";
var daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
day = daysOfWeek[currentDay];
 */

/* if (currentDay === 6 || currentDay === 0) { //calc day of the week
    day = "Weekend";
} else{
    day = "Weekday";
} */
//render that day