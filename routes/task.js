const express = require("express")
const {handleTaskPost , handleTaskGet
    ,handleDeleteTask,handleUpdateTask,
    handleParticularGet
}=require("../controllers/task")
const router = express.Router()


router.post('/' , handleTaskPost )

router.get('/my-task' , handleTaskGet )

router.get('/particular-task' , handleParticularGet)

router.delete('/delete' , handleDeleteTask)

router.patch('/update' , handleUpdateTask)

module.exports = router