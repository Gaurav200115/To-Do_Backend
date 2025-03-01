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

app.use('/task' , taskrouter)

app.listen(8001 ,'0.0.0.0' ,()=>{
    console.log("server running at 8001")
})

