module.exports = (mongoose) => {
    const Project = mongoose.model('project',
        mongoose.Schema({
            project_id: Number,
            project_name: String,
            project_description: String,
            project_priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
            project_status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started' },
            project_owner: String,
            project_members: [String]
        }, {
            timestamps: true
        })
    );
    return Project;
};