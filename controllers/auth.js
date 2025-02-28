const User = require("../models/user")
const {randomBytes} = require("crypto")
const {setUser , getUser} = require("../services/auth")
const secret = "Gaurav@1510"
const jwt = require("jsonwebtoken")

async function handlePostOfUser(req,res) {
    try{
        const body = req.body
        console.log(body)
        console
        const rs = await User.create({
            fullname : body.fullname,
            email : body.email,
            password : body.password,
            salt : randomBytes(16).toString(),
            createdAt: Date.now()
        })

        if(!rs){
            return res.json(404).json("Server Error")
        }

        const token = setUser(rs);
        console.log(token)
        return res.json(token)
    }catch(err){
        console.log(err)
    }
    
}

async function handleGetOfUser(req,res) {
    try{
        const email = String(req.query.email)
        const password = String(req.query.password)
        console.log("1",email,password)
        const user = await User.matchPasswordAndGenerateToken(email,password)

        if(!user){
            return res.status(404).json("User not found")
        }
        
        res.json(user)
    }catch(err){
        console.log(err)
    }
    
}



async function handleCheckofUser(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    try {
      console.log("0")
      const decoded = jwt.verify(token , secret)
      console.log("1")
      const user = await User.findById(decoded.userId).select('-password');
      console.log("2")
      res.json(user);
      console.log("3")
    } catch  {
      res.status(401).json({ message: "Invalid token" });
    }
}

const getUserDetails = async (req, res) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];

      console.log(token)
      if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
      }
  
      const decoded = jwt.verify(token, secret);
      
      const user = await User.findById(decoded._id);
      
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
  
      return res.json(user);
  
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };




module.exports={
    handlePostOfUser , 
    handleGetOfUser,
    handleCheckofUser,
    getUserDetails
}