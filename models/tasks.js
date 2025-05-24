module.exports = (mongoose) => {
    const Task = mongoose.model('task', mongoose.Schema({
        task_name: String,
        task_description: String,
        task_status: {
            type: String,
            enum: [
                'not started',
                'in progress',
                'completed'
            ],
            default: 'not started'
        },
        task_priority: {
            type: String,
            enum: [
                'low',
                'medium',
                'high'
            ],
            default: 'medium'
        },
        assigned_to: String, // Person assigned to the task
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project', required: true
        } // Parent Project
    }, {
        timestamps: true
        })
    )
    return Task;
}
