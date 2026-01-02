// backend/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const chatRoutes = require("./routes/chatRoutes");

const syllabusRoutes = require("./routes/syllabusRoutes");
const questionPaperRoutes = require("./routes/questionPaperRoutes");
const studyPlanRoutes = require("./routes/studyPlanRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/question-paper", questionPaperRoutes);
app.use("/api/study-plan", studyPlanRoutes);
app.use("/api/chat", chatRoutes);
app.get("/", (req, res) => {
  res.send("Smart Exam AI Backend Running");
});

module.exports = app;

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working perfectly 🚀" });
});
