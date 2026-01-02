const Syllabus = require('../models/Syllabus');
const { generateStudyPlan } = require('../services/geminiService');

const createStudyPlan = async (req, res) => {
    try {
        const { syllabusId, hoursPerDay, examDate } = req.body;

        const syllabus = await Syllabus.findById(syllabusId);
        if (!syllabus) return res.status(404).json({ success: false, message: 'Syllabus not found' });

        let studyPlan = await generateStudyPlan(syllabus, hoursPerDay, examDate);

        // Ensure schedule array exists
        if (!studyPlan.schedule) studyPlan.schedule = [];

        res.json({ success: true, studyPlan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error generating study plan' });
    }
};

module.exports = { createStudyPlan };
