const axios = require('axios');

const GEN_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const cleanText = (text) => {
    return text
        .replace(/`/g, '')        // remove backticks
        .replace(/\$/g, '')       // remove $ symbols
        .replace(/\\\{/g, '{')    // remove backslash before {
        .replace(/\\\}/g, '}')    // remove backslash before }
        .replace(/\\_/g, '_')     // remove backslash before _
        .trim();
};

const generateQuestionPaper = async (syllabus) => {
    // Build structured syllabus for the prompt
    const syllabusText = syllabus.units
        .map(u => `${u.unitName}: ${u.topics.join(', ')}`)
        .join('\n');

    const prompt = `
You are an experienced Indian university paper setter.

Course:
${syllabus.courseName}

Syllabus:
${syllabusText}

Generate a COMPLETE university examination paper.

Requirements:

SECTION A
- 10 Easy questions
- 2 marks each

SECTION B
- 10 Medium questions
- 5 marks each

SECTION C
- 5 Long questions
- 10 marks each

Rules:
- Cover ALL units.
- Cover ALL important topics.
- Mix theory and practical questions.
- Include numerical/problem-solving questions wherever applicable.
- No duplicate questions.

Return ONLY JSON:

{
  "questions": [
    "Q1 ...",
    "Q2 ...",
    ...
  ]
}
`;

    const response = await axios.post(
        GEN_URL,
        { contents: [{ parts: [{ text: prompt }] }] },
        {
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY
            }
        }
    );

    let text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    try {
        const data = JSON.parse(text);
        const cleanedQuestions = data.questions.map((q, idx) => `${idx + 1}. ${cleanText(q)}`);
        return { questions: cleanedQuestions };
    } catch (err) {
        console.error('Failed to parse Gemini response, using fallback');
        return { questions: [`1. ${cleanText(text)}`] };
    }
};

module.exports = { generateQuestionPaper };
