const Syllabus = require('../models/Syllabus');
const StudyPlan = require('../models/StudyPlan');
const { generateStudyPlan } = require('../services/geminiStudyPlanner');

const createStudyPlan = async (req, res) => {
    try {
        const { syllabusId, examDate, hoursPerDay } = req.body;

        const syllabus = await Syllabus.findById(syllabusId);
        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }

        const aiPlan = await generateStudyPlan(
            syllabus,
            examDate,
            hoursPerDay
        );

        const studyPlan = new StudyPlan({
            syllabusId,
            examDate,
            hoursPerDay,
            plan: aiPlan.plan
        });

        await studyPlan.save();

        res.json({ success: true, studyPlan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Study plan generation failed' });
    }
};

module.exports = { createStudyPlan };
