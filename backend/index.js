const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();

app.use(express.json())
app.use(cors())

// connection to mongodb
mongoose.connect(process.env.URI).then(() => {
    console.log("mongodb connected to db")
}).catch((err) => {
    console.error("failed to connect to mongdb", err)
})


const taskSchema = new mongoose.Schema({ task: String })
const Task = mongoose.model("tasks", taskSchema)

app.post("/tasks", async (req, res) => {
    try {
        const { task } =  req.body
        const newTask = new Task({task})
        await newTask.save()
        console.log("userSaved")
        res.status(201).json(newTask)
    } catch (err) {
        res.status(401).json({ error: err })
    }
})

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks )
    } catch (err) {
        res.status(401).json({ error: err })
    }
})


app.delete("/tasks/:id", async (req, res) => {
    try {
         await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"deleted"  })
    } catch (err) {
        res.status(401).json({ error: err })
    }
})
const PORT = process.env.PORT | 5000
app.listen(PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})
