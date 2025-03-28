const API_KEY = "AIzaSyDzbxO6j_GtxXW_yOBjrYWEIh4XONxoVTQ";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

export const getGeminiResponse = async (userInput) => {
  try {
    console.log("Sending request to:", GEMINI_API_URL); // Debug log

    // Corrected Request Body
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [              
            { text: userInput }
          ]
        }
      ]
    };

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("API Response:", data); // Debug response log

    // Handle API errors
    if (data.error) {
      console.error("API Error:", data.error);
      return `Error: ${data.error.message}`;
    }

    // Extract AI response properly
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "Sorry, I couldn't understand that.";
    }

  } catch (error) {
    console.error("Network error:", error);
    return "Oops! Something went wrong.";
  }
};
