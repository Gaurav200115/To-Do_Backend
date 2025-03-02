const express = require("express")
const connecttoDb = require("./connections")
const app = express()
const taskrouter = require("./routes/task")
const router = require("./routes/auth")
const cors = require("cors");

connecttoDb("mongodb+srv://devsort1510:Gaurav1510@cluster0.4jw1l.mongodb.net/To-Do");

app.use(cors());

app.use(express.urlencoded({extended:false})) 

app.use(express.json()); 

app.use('/user', router)

app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.use('/task' , taskrouter)

module.exports = app;
