const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// Validate API key exists
if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in environment variables");
  process.exit(1);
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/api/chatgpt", async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log("Incoming request:", req.body.message);

    // Initialize chat with context
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(req.body.message);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini response received");
    res.json({ response: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred while processing your request"
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
  console.log(`Accepting requests from http://localhost:5173`);
});