const axios = require('axios');

const GEN_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const generateStudyPlan = async (syllabus, examDate, hoursPerDay) => {
    const prompt = `
You are a smart study planner for Indian college students.

Course: ${syllabus.courseName}
Units and Topics:
${syllabus.units.map(u => `${u.unitName}: ${u.topics.join(', ')}`).join('\n')}

Exam Date: ${examDate}
Study Hours per Day: ${hoursPerDay}

Generate a day-wise study plan.
Output JSON ONLY in this format:
{
  "plan": [
    { "day": "Day 1", "tasks": ["Task 1", "Task 2"] }
  ]
}
`;

    const response = await axios.post(
        GEN_URL,
        {
            contents: [{ parts: [{ text: prompt }] }]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY
            }
        }
    );

    const text =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    let parsed;

try {
    parsed = JSON.parse(text);
} catch (err) {
    console.error('Gemini returned invalid JSON:', text);

    // fallback so server NEVER crashes
    parsed = {
        plan: [
            {
                day: "Day 1",
                tasks: ["Revise syllabus topics"]
            }
        ]
    };
}

return parsed;
};

module.exports = { generateStudyPlan };
