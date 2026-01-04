const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
    syllabusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Syllabus',
        required: true
    },
    examDate: {
        type: String,
        required: true
    },
    hoursPerDay: {
        type: Number,
        required: true
    },
    plan: [
        {
            day: String,
            tasks: [String]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
