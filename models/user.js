const mongoose = require("mongoose")
const {randomBytes, createHmac} = require("crypto")
const {setUser} = require("../services/auth")

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:String
    }

}, { timestamps: true })


UserSchema.pre("save" ,function(next){
    const user = this;
    console.log("1")
    if(!user.isModified("password")) return

    console.log("2")
    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac("sha256" , salt)
    .update(user.password)
    .digest("hex")
    console.log("3")

    this.salt = salt
    this.password = hashedPassword
    console.log("4")
    next()
})


UserSchema.static('matchPasswordAndGenerateToken' , async function(email , password){
    console.log(email , password)
    const user =  await User.findOne({email})
    if(!user) console.log("User not found")

    console.log("2" , user)
    const salt = user.salt 
    const hashedPassword = user.password
    console.log("3" , salt , hashedPassword)
    const hashedUserPassword = createHmac("sha256" , salt)
    .update(password)
    .digest("hex")

    console.log(salt ,hashedPassword ,hashedUserPassword)
    console.log("4")

    if(hashedPassword !== hashedUserPassword)  console.log("Wrong Credetials")
    
    const token = setUser(user)

    return token
})

const User = mongoose.model("user" , UserSchema)



module.exports = User

