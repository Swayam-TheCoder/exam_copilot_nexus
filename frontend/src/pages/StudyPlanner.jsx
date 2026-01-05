import React, { useState } from "react";
import axios from "axios";

function StudyPlanner() {
  const [syllabusId, setSyllabusId] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hours, setHours] = useState(3);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (syllabusId.length !== 24) {
      alert("Enter valid Syllabus ID");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5001/api/study-plan",
        { syllabusId, examDate, hoursPerDay: hours },
        { headers: { "Content-Type": "application/json" } }
      );
      setPlan(res.data.studyPlan.plan);
    } catch (err) {
    console.error("Study Planner Error:", err.response?.data || err.message);
    alert(
      err.response?.data?.message ||
      "Study plan generation failed (check syllabus ID)"
    );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 to-black p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📅 Smart Study Planner
      </h1>

      <div className="max-w-xl mx-auto bg-white/10 p-6 rounded-xl shadow-lg">
        <input
          className="w-full p-3 mb-3 rounded bg-black/30"
          placeholder="Syllabus ID"
          value={syllabusId}
          onChange={(e) => setSyllabusId(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-3 mb-3 rounded bg-black/30"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-3 mb-4 rounded bg-black/30"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <button
          type="button"
          onClick={generatePlan}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded font-semibold"
        >
          {loading ? "Generating..." : "Generate Study Plan"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        {plan.map((day, i) => (
          <div
            key={i}
            className="bg-white/10 p-4 rounded-lg mb-4 shadow"
          >
            <h3 className="font-bold mb-2">{day.day}</h3>
            <ul className="list-disc ml-6">
              {day.tasks.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyPlanner;
