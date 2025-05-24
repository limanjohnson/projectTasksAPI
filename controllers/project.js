const db = require('../models');
const Project = db.projects;

exports.create = (req, res) => {
    // #swagger.tags=["Projects"]
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    // Create a Project
    const project = new Project({
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_priority: req.body.project_priority,
        project_status: req.body.project_status,
        project_owner: req.body.project_owner,
        project_members: req.body.project_members,
    });
    // Save Project in the database
    project
        .save(project)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Project.',
            });
        });
};

exports.findAll = (req, res) => {
    // #swagger.tags=["Projects"]
        Project.find(
            {},
            {
                project_id: 1,
                project_name: 1,
                project_description: 1,
                project_priority: 1,
                project_status: 1,
                project_owner: 1,
                project_members: 1,
            }
        )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while retrieving Projects.',
                });
            });
};

// Find a single Project with an id
exports.findOne = (req, res) => {
    // #swagger.tags=["Projects"]
    const project_id = req.params.project_id;
        Project.findById(project_id)
            .then((data) => {
                if (!data)
                    res
                        .status(404)
                        .send({ message: 'Not found Project with id ' + project_id });
                else res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving Project with project_id=' + project_id,
                });
            });
};

exports.updateProject = (req, res) => {
    // #swagger.tags=["Projects"]
    const project_id = req.header('project_id');

    const project = {
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_priority: req.body.project_priority,
        project_status: req.body.project_status,
        project_owner: req.body.project_owner,
        project_members: req.body.project_members,
    }

    // Validate request body
    if (!project_id) {
        return res.status(400).send({ message: 'Update data cannot be empty!' });
    }

    // Validate the project ID
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(project_id)) {
        return res.status(400).send({ message: 'Invalid project ID format!' });
    }

    // Use findByIdAndUpdate to update one project
    Project.findByIdAndUpdate(
        project_id,    // ID of the project to update
        req.body,      // Data to update
        { new: true }  // Options: return the updated document
    )
        .then((data) => {
            if (!data) {
                // If no project was found with the provided ID
                return res.status(404).send({ message: 'No project with id ' + project_id + ' exists' });
            }
            // Successfully updated the project, return the updated document
            res.send(data);
        })
        .catch((err) => {
            // Handle any errors that occur during the update
            console.error(`Error updating project with id=${project_id}:`, err);
            res.status(500).send({ message: 'Error updating project with id=' + project_id });
        });
};

exports.deleteProject = async (req, res ) => {
    // #swagger.tags=["Projects"]
    const project_id = req.header('project_id');
    if (!project_id) {
        return res.status(400).send({ message: 'You need to include a project id'})
    }

    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(project_id)) {
        return res.status(400).send({ message: 'Invalid project ID'});
    }

    try {
        // find and delete the project by ID
        const result = await Project.findByIdAndDelete(project_id);

        if (!result) {
            return res.status(404).send({ message: 'No project found with the project id: ' + project_id})
        }

        // Successfully deleted the project
        res.status(200).send({ message: 'Project deleted successfully!'})
    } catch (err) {
        console.error(`Error deleting project: ${err.message}`);
        res.status(500).send({ message: 'Error occurred while trying to delete the project'})
    }
}
