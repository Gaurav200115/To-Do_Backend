const express = require("express")
const {handleGetOfUser , handlePostOfUser
    ,handleCheckofUser,getUserDetails} = require("../controllers/auth")
const router = express.Router()

router.post('/' , handlePostOfUser)
router.get('/login' ,  handleGetOfUser)
router.get('/check' , handleCheckofUser)
router.get('/logout' , getUserDetails)

module.exports = router
