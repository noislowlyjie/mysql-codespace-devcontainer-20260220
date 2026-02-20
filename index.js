const express = require("express"); 
const mysql2 = require("mysql2/promise"); 
const ejs = require("ejs");
const dotenv = require("dotenv"); 

const app = express(); 
const port = 3000; 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.set("view engine", "ejs"); 
app.set("views", "./views"); 

dotenv.config(); 
const dbConfig = { 
host: process.env.DB_HOST, 
user: process.env.DB_USER, 
password: process.env.DB_PASSWORD, 
database: process.env.DB_NAME, 
port: process.env.DB_PORT 
} 
const dbConnection = mysql2.createPool(dbConfig); 


app.get("/food-entry/create", function(req,res){ 
res.render('create-food-entry'); 
}) 

app.post('/food-entry/add', async (req, res) => { 
const { dateTime, foodName, calories, meal, tags, servingSize, unit } = req.body; 
console.log(dateTime, foodName, calories, meal, tags, servingSize, unit); 
res.send("Food entry added successfully"); 
}) 

app.get("/", async (req, res) => { 
    const [rows] = await dbConnection.query("SELECT * FROM food_entries"); 
    res.render("index", { foodEntries: rows }); 
}); 