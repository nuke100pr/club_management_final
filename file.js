const API_KEY = "AIzaSyDMrvCZixMBXvnVOclG1ObhXOLzH0fon7U";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const fetchAIResponse = async (inputText) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: inputText }] }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

        console.log("AI Response:", reply);
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your prompt: ", (inputText) => {
    fetchAIResponse(inputText).then(() => rl.close());
});
