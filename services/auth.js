const jwt = require("jsonwebtoken")
const secert = "Gaurav@1510"

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email
    }, secert)
}

function getUser(token){
    try{
        return jwt.verify(token , secert)
    }catch(err){
        console.log(err)
    }
}

module.exports = {setUser , getUser}