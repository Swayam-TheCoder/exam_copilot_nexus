const Syllabus = require("../models/Syllabus");
const StudyPlan = require("../models/StudyPlan");
const { generateStudyPlan } = require("../services/geminiStudyPlanner");

const createStudyPlan = async (req, res) => {
  try {
    const { syllabusId, examDate, hoursPerDay } = req.body;

    if (!syllabusId || syllabusId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid syllabusId",
      });
    }

    const syllabus = await Syllabus.findById(syllabusId);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: "Syllabus not found",
      });
    }

    let aiResult;

    try {
      aiResult = await generateStudyPlan(
        syllabus,
        examDate,
        hoursPerDay
      );
    } catch (err) {
      console.error("Gemini failed, using fallback");

      aiResult = {
        plan: [
          {
            day: "Day 1",
            tasks: ["Revise Unit 1 topics"],
          },
          {
            day: "Day 2",
            tasks: ["Practice important questions"],
          },
        ],
      };
    }

    // Convert Day 1, Day 2 into actual dates
    const startDate = new Date();

    const planWithDates = aiResult.plan.map((day, index) => {
      const currentDate = new Date(startDate);

      currentDate.setDate(
        startDate.getDate() + index
      );

      return {
        day: currentDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        tasks: day.tasks,
        completedTasks: [],
      };
    });

    // Optional:
    // Remove previous plan for same syllabus
    await StudyPlan.deleteMany({
      syllabusId,
    });

    const savedPlan = await StudyPlan.create({
      syllabusId,
      examDate,
      hoursPerDay,
      plan: planWithDates,
    });

    res.json({
      success: true,
      studyPlan: savedPlan,
    });
  } catch (err) {
    console.error(
      "FINAL Study Planner Error:",
      err
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate study plan",
    });
  }
};

module.exports = {
  createStudyPlan,
};