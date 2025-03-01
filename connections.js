const mongoose = require("mongoose")
require('dotenv').config();


async function connecttoDb(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    .then(()=>console.log("DBConnected"))
    .catch((err)=>console.log(err))
}

module.exports = connecttoDb