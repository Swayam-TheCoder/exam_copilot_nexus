import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SyllabusUpload from "./pages/SyllabusUpload";
import QuestionPaper from "./pages/QuestionPaper";
import StudyPlanner from "./pages/StudyPlanner";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 px-4 py-8 relative overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/syllabus-upload" element={<SyllabusUpload />} />
            <Route path="/question-paper" element={<QuestionPaper />} />
            <Route path="/study-planner" element={<StudyPlanner />} />
          </Routes>
          <ChatBot />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
