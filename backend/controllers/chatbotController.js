require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is correctly set in .env
});

const chatbotResponse = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });

        res.json({ reply: response.choices[0]?.message?.content || "I couldn't understand that." });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).json({ error: "Failed to fetch response" });
    }
};

module.exports = { chatbotResponse };