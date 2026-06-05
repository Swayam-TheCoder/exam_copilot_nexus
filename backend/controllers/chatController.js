const axios = require("axios");

const GEN_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const cleanAIResponse = (text) => {
  return text
    // Bold, italic
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")

    // Code blocks & inline code
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`/g, "")

    // LaTeX / Math
    .replace(/\$/g, "")
    .replace(/\\\(/g, "")
    .replace(/\\\)/g, "")
    .replace(/\\\[/g, "")
    .replace(/\\\]/g, "")

    // Headers
    .replace(/^#{1,6}\s+/gm, "")

    // Convert markdown bullets
    .replace(/^\s*[-*+]\s+/gm, "• ")

    // Convert numbered markdown
    .replace(/^\s*(\d+)\.\s+/gm, "$1. ")

    // Remove markdown blockquotes
    .replace(/^>\s+/gm, "")

    // Remove horizontal lines
    .replace(/^---+$/gm, "")
    .replace(/^\*\*\*+$/gm, "")

    // Remove escaped characters
    .replace(/\\_/g, "_")
    .replace(/\\\*/g, "*")
    .replace(/\\-/g, "-")
    .replace(/\\#/g, "#")

    // Normalize spaces
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const sendMessageToAI = async (req, res) => {
  try {
    const { message, context } = req.body;

    const prompt = `
You are ExamCopilot AI, a study assistant for students.

STRICT RESPONSE RULES:

- Return plain text only.
- Never use Markdown.
- Never use **.
- Never use *.
- Never use #.
- Never use backticks.
- Never use code blocks.
- Never use dollar symbols.
- Never use LaTeX formatting.
- Never use markdown tables.
- Use simple readable English.
- Use numbered lists when needed:
  1.
  2.
  3.
- Use bullet symbol only:
  •
- Keep answers concise and well structured.
- For mathematics, write formulas in plain text.
  Example:
  x² + y² = r²
  not LaTeX.

Context:
${JSON.stringify(context || {})}

Student Question:
${message}
`;

    const response = await axios.post(
      GEN_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const rawReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not answer that.";

    const reply = cleanAIResponse(rawReply);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error.response?.data || error.message);

    if (error.response?.data?.error?.code === 429) {
      return res.status(429).json({
        success: false,
        reply:
          "AI service is currently busy. Please try again in a few seconds.",
      });
    }

    res.status(500).json({
      success: false,
      reply: "Server Error",
    });
  }
};

module.exports = { sendMessageToAI };