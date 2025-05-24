const db = require('../models');
const Task = db.tasks;
const mongoose = require('mongoose');

// create a task
exports.create = async (req, res) => {
    // #swagger.tags=["Tasks"]
    if (!req.body.task_name || !req.body.project_id || !req.body.assigned_to) {
        res.status(400).send({ message: "Missing required fields!" });
        return;
    }

    const project_id = req.body.project_id;

    try {
        // import project model for validation
        const db = require('../models');
        const Project = db.projects;

        // Check if project id exists in the database
        const existingProject = await Project.findById(project_id);
        if (!existingProject) {
            return res.status(404).send({ message: "Project not found!" });
        }

        // If project exists, create task
        const Task = db.tasks;
        const task = new Task({
            task_name: req.body.task_name,
            task_description: req.body.task_description,
            task_status: req.body.task_status,
            task_priority: req.body.task_priority,
            assigned_to: req.body.assigned_to,
            project_id: req.body.project_id, // references an existing project
        });

        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (err) {
        console.error(`Error creating task: ${err.message}`);
        res.status(500).send({ message: "Error creating task. The project you listed may not exist." });
    }
};

// get all tasks
exports.getAllTasks = (req, res) => {
    // #swagger.tags=["Tasks"]
    Task.find(
        {},
        {
            task_id: 1,
            task_name: 1,
            task_description: 1,
            task_status: 1,
            assigned_to: 1,
            task_priority: 1,
            project_id: 1,
        }
    )
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tasks.",
            });
        });
};

// get single tasks
exports.getSingleTask = (req, res) => {
    // #swagger.tags=["Tasks"]
    const task_id = req.params.task_id;

    if (!task_id) {
        return res.status(400).send({ message: "Task ID cannot be empty!" });
    }

    Task.findById(task_id)
        .then((data) => {
            if (!data)
                res
                    .status(404)
                    .send({ message: "Not found task with id " + task_id });
                else res.send(data);
            })
            .catch(() => {
                res.status(500).send({
                    message: "Error retrieving task with task_id=" + task_id,
                });
            });
}

// Get tasks by project
// exports.findByProject = (req, res) => {
//
//     const project_id = req.params.project_id;
//
//     // Debugging log for received parameter
//     console.log(`findByProject called with project_id: ${project_id}`);
//
//     // Validate the project ID (adjust based on how it's stored in the database)
//     if (!mongoose.Types.ObjectId.isValid(project_id)) {
//         return res.status(400).send({ message: "Invalid project ID format!" });
//     }
//
//     // Adjust query if project_id is stored as ObjectId or string
//     Task.find({ project_id: mongoose.Types.ObjectId(project_id) }) // Modify this casting as needed
//         .then(data => {
//             console.log("Tasks found:", data);
//             if (!data || data.length === 0) {
//                 return res.status(404).send({ message: "No tasks found for this project." });
//             }
//             res.send(data);
//         })
//         .catch(err => {
//             console.error(`Error retrieving tasks for project_id=${project_id}:`, err.message);
//             res.status(500).send({
//                 message: err.message || "An error occurred while retrieving tasks."
//             });
//         });
// };

// update an existing task
exports.update = async (req, res) => {
    // #swagger.tags=["Tasks"]
    const task_id = req.params.task_id;

    const task = {
        task_name: req.body.task_name,
        task_description: req.body.task_description,
        task_status: req.body.task_status,
        task_priority: req.body.task_priority,
        assigned_to: req.body.assigned_to,
        project_id: req.body.project_id,
    }

    // Validate request body
    if (!task_id) {
        return res.status(400).send({ message: "Update data cannot be empty!" });
    }

    // Validate the project ID
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(task_id)) {
        return res.status(400).send({ message: "Invalid task ID format!" });
    }

    // Use findByIdAndUpdate to update one task

    Task.findByIdAndUpdate(
        task_id,
        req.body,
        { new: true }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "No task with id " + task_id + " exists."})
            }
            res.send(data);
        })
        .catch((err) => {
            console.error(`Error updating task with id=${task_id}:`, err);
            res.status(500).send({ message: "Error updating task with id=" + task_id });
        });

    // try{
    //     const updatedTask = await Task.findByIdAndUpdate(
    //         task_id,
    //         req.body,
    // {
    //             new: true,
    //             runValidators: true,
    //         }
    //     )
    //
    //     if (!updatedTask) {
    //         return res.status(404).send({ message: "No task with id " + task_id + " exists."})
    //     }
    //     res.send(updatedTask);
    // } catch(err) {
    //     console.error(`Error updating task with id=${task_id}:`, err);
    //     res.status(500).send({ message: "Error updating task with id=" + task_id });
    // }
};

// delete an existing task
exports.deleteTask = async (req, res) => {
    // #swagger.tags=["Tasks"]
    const task_id = req.params.task_id;

    if (!task_id) {
        return res.status(400).send({ message: "You need to include a task id" });
    }

    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(task_id)) {
        return res.status(400).send({ message: "Invalid task ID" });
    }

    try {
        // Attempt to delete the task
        const result = await Task.findByIdAndDelete(task_id);

        if (!result) {
            return res.status(404).send({ message: "No task found with the task id: " + task_id });
        }

        // Successfully deleted the task
        res.status(200).send({ message: 'Task deleted successfully!' });
    } catch (err) {
        console.error(`Error deleting task: ${err.message}`);
        res.status(500).send({ message: 'Error occurred while trying to delete the task' });
    }
};