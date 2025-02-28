const mongoose = require("mongoose")

async function connecttoDb(url) {
    return mongoose.connect(url)
    .then(()=>console.log("DBConnected"))
    .catch((err)=>console.log(err))
}

module.exports = connecttoDb