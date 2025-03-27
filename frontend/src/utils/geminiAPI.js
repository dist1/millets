const API_KEY = "AIzaSyDzbxO6j_GtxXW_yOBjrYWEIh4XONxoVTQ";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

export const getGeminiResponse = async (userInput) => {
    try {
        console.log("Sending request to:", GEMINI_API_URL);

        const requestBody = {
            contents: [{ role: "user", parts: [{ text: userInput }] }],
        };

        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("API Response:", data);

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

/**
 * Convert image file to Base64
 */
const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); // Extract Base64 string
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Send Image + Question to Gemini API
 */
export const getGeminiResponseWithImage = async (imageFile, userQuestion) => {
    try {
        let parts = [];

        if (userQuestion) {
            parts.push({ text: userQuestion });
        }

        if (imageFile) {
            const base64Image = await convertImageToBase64(imageFile);
            parts.push({ inline_data: { mime_type: "image/png", data: base64Image } });
        }

        const requestBody = { contents: [{ role: "user", parts }] };

        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Sorry, I couldn't understand that.";
        }
    } catch (error) {
        console.error("Error:", error);
        return "Something went wrong!";
    }
};