const Task = require("../models/task")
const User = require("../models/user")
const secret = "Gaurav@1510"
const jwt = require("jsonwebtoken")

async function handleTaskPost(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token
        if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
        }
    
        const decoded = jwt.verify(token, secret);
        const body = req.body
        const result = await Task.create({
            title: body.title,
            description: body.description,
            status: body.status,
            priority: body.priority,
            userId: decoded._id,
            createdAt: body.createdAt,
        })

        if (!result) {
            return res.status(400).json("Server Error")
        } else {
            console.log("getting working fine")
        }
        return res.status(200).json("Working fine ")
    } catch (err) {
        console.log(err)
    }
}

async function handleTaskGet(req, res) {
    try {
        console.log('1')
        const token = req.header("Authorization")?.split(" ")[1];
        console.log('2')

        if (!token) {
            return res.status(401).json({ message: "Access Denied! No token provided." });
        }
        console.log('3')
        console.log(token)
        // Verify the token and extract user ID
        const decoded = jwt.verify(token, secret);
        console.log('4')

        const id = decoded._id; // Extract user ID from token payload
        console.log('5')

        // Fetch tasks for the specific user
        console.log(id)
        const result = await Task.find({ userId: id })
        if (!result.length) {
            console.log("No such data posted")
        }

        return res.status(200).json(result)
    } catch (err) {
        console.log(err)
    }
}

async function handleParticularGet(req, res) {
    try {
        console.log("Query Params:", req.query); // Debugging
        const { taskId } = req.query; // Extracting taskId from query parameters

        if (!taskId) {
            return res.status(400).json({ error: "Task ID is required" });
        }

        const result = await Task.findById(taskId); // Fetch task by ID

        if (!result) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json(result); // Send task details as JSON response
    } catch (err) {
        console.error("Error fetching task:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function handleDeleteTask(req, res) {
    try {
        const {taskId} = req.query
        console.log(taskId)
        console.log("1")
        const result = await Task.findOneAndDelete({ _id:taskId })

        if (!result) {
            return res.status(400).json("not found")
        }

        return res.status(200).json("Deleted Succesfully")
    } catch (err) {
        console.log(err)
    }
}


async function handleUpdateTask(req, res) {
    try {
        console.log("1");

        const { _id, status,title,description,priority } = req.body; // Destructure `req.body`
        console.log("Received ID:", _id);

        if (!_id) {
            return res.status(400).json({ error: "_id is required" });
        }

        const result = await Task.findOneAndUpdate({ _id }, { status,title,description,priority }, {
            new: true,
            runValidators: true,
        });

        console.log("Updated Task:", result);

        if (!result) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json({ message: "Updated Successfully", task: result });
    } catch (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handleTaskPost,
    handleTaskGet,
    handleDeleteTask,
    handleUpdateTask,
    handleParticularGet
}