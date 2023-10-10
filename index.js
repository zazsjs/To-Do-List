import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Today's Date
const d = new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let dayOfWeek = weekday[d.getDay()];

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let thisMonth = month[d.getMonth()];

let day = d.getDate();

//add To Do item
/*function addToList(){
  addToDoButton.addEventListener('click', function(){
    var label = document.createElement('label');
    label.classList.add("item");
    doList.appendChild(label);
  });
};
*/

let newItemsSchool = [];
let newItemsToday = [];
let newItemsWork = [];

//Sites
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/work", (req, res) => {
  res.render("work.ejs", {newListItems: newItemsWork});
});

app.get("/school", (req, res) => {
  res.render("school.ejs", {newListItems: newItemsSchool});
});

app.get("/today", (req, res) => {
  res.render('today.ejs', {todaysDate: dayOfWeek + ", " + thisMonth + " " + day, newListItems: newItemsToday});
});

app.post("/school", (req, res) => {
  const newItem = req.body.newItem;
  newItemsSchool.push(newItem);
  res.redirect("/school");
});

app.post("/today", (req, res) => {
  const newItem = req.body.newItem;
  newItemsToday.push(newItem);
  res.redirect("/today");
});

app.post("/work", (req, res) => {
  const newItem = req.body.newItem;
  newItemsWork.push(newItem);
  res.redirect("/work");
});

app.delete("/school", (req, res) => {
  const deleteItem = req.body.deleteItem;
  newItems.splice(deleteItem, 1);
  res.redirect("/school");
  console.log("item deleted");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});