const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

//  MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Geethu@3338',   
    database: 'membership_db'   
});
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});



//  REGISTER API

app.post("/register", (req, res) => {
const { name, email, password } = req.body;
const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Registration Failed");
        }
        res.send("Registration Successful");
    });
});



//  LOGIN API

app.post("/login", (req, res) => {
const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
      if (err) return res.send("Error");
        if (result.length > 0) {

            //  GET USER PLAN
            const planSql = "SELECT plan FROM subscriptions WHERE email = ?";
            db.query(planSql, [email], (err2, planResult) => {
                if (err2) return res.send("Error");
                let plan = null;
                if (planResult.length > 0) {
                    plan = planResult[0].plan;
                }
                // SEND BOTH LOGIN + PLAN
                res.json({
                    message: "Login Successful",
                    plan: plan
                });
            });
        } else {
            res.send("Invalid");
        }
    });

});



// 💳 SAVE PLAN

app.post("/select-plan", (req, res) => {

    const { email, plan } = req.body;

    //  REPLACE SQL HERE
    const sql = `
    INSERT INTO subscriptions (email, plan)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE plan = ?
    `;
    db.query(sql, [email, plan, plan], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Database Error");
        }
        res.send("Plan Updated Successfully");
    });
});


//  GET USER PLAN

app.get("/get-plan/:email", (req, res) => {
    const email = req.params.email;
    const sql = `
        SELECT plan FROM subscriptions 
        WHERE email=? 
        ORDER BY id DESC LIMIT 1
    `;
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error fetching plan");
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.json({ plan: null });
        }
    });
});



// 🎬 GET MOVIES BASED ON PLAN

app.get("/movies/:plan", (req, res) => {
    const plan = req.params.plan;
      let sql;
    if (plan === "Basic") {
        sql = "SELECT * FROM movies WHERE plan='Basic'";
    } 
    else if (plan === "Pro") {
        sql = "SELECT * FROM movies WHERE plan IN ('Basic','Pro')";
    } 
    else {
        sql = "SELECT * FROM movies";
    }
      db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error fetching movies");
        }
        res.json(result);
    });
});



//  START SERVER

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});