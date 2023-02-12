const express = require('express');
const mysql = require('mysql');
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crudapp",
  });

db.connect();

  app.post("/insert", (req,res)=>{
      const foodName = req.body.foodName;
      const daysSinceIAte = req.body.days;
      
      db.query( "insert into foods(foodName,daysSinceIAte) values(?,?)",[foodName,daysSinceIAte],(err, result) => {
          if (err) {
            console.log(err);
          }
         
        }
      );
})

  app.get("/read", (req,res)=>{
       
    db.query("select * from foods", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    
 })

 app.put("/update", (req,res)=>{
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    db.query("update foods set foodName = ? where id = ?", [newFoodName, id], (err, result) => {
          if (err) {
            console.log(err);
          } 
          
        }
      );
})

app.delete("/delete/:id", (req,res) => {
    const id = req.params.id;
    db.query("delete from foods where id = ?", id, (err, result) => {
        if (err) {
          console.log(err);
        } 
      });
    
})

app.listen(5000,()=>{
      console.log("server is listening to 5000")
  })