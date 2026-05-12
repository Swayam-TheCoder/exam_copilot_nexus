const axios = require('axios');

const GEN_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const sendMessageToAI = async (req, res) => {
    try {
        const { message, context } = req.body;

        const prompt = `
You are a smart AI study assistant for Indian college students.

Context:
${JSON.stringify(context)}

Student asked:
${message}
`;

        const response = await axios.post(
            GEN_URL,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': process.env.GEMINI_API_KEY
                }
            }
        );

        const reply =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Sorry, I could not answer that.';

        res.json({
            success: true,
            reply
        });

    } catch (error) {
        console.error('CHAT ERROR:', error.response?.data || error.message);

        res.status(500).json({
            success: false,
            reply: 'Server Error'
        });
    }
};

module.exports = { sendMessageToAI };