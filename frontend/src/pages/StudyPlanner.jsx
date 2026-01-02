import React, { useState, useEffect } from "react";
import { getSyllabi, generateStudyPlan } from "../services/api";
import AIChatBot from "../components/AIChatBot";

const StudyPlanner = () => {
  const [syllabi, setSyllabi] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [studyPlan, setStudyPlan] = useState(null);

  useEffect(() => {
    async function fetchSyllabi() {
      const data = await getSyllabi();
      setSyllabi(data.syllabi);
    }
    fetchSyllabi();
  }, []);

  const handleGeneratePlan = async () => {
    const data = await generateStudyPlan(
      selectedSyllabus,
      examDate,
      hoursPerDay
    );
    setStudyPlan(data.studyPlan);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Generate Study Plan</h2>
      <select
        className="border p-2 w-full mb-2"
        onChange={(e) => setSelectedSyllabus(e.target.value)}
      >
        <option value="">Select Syllabus</option>
        {syllabi.map((s) => (
          <option key={s._id} value={s._id}>
            {s.courseName}
          </option>
        ))}
      </select>
      <input
        type="date"
        className="border p-2 w-full mb-2"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 w-full mb-2"
        value={hoursPerDay}
        onChange={(e) => setHoursPerDay(e.target.value)}
      />
      <button
        onClick={handleGeneratePlan}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate Plan
      </button>

      {studyPlan?.schedule?.length > 0 && (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
        <h3 className="text-lg font-bold mb-2">Study Plan</h3>
        <ul className="space-y-1">
            {studyPlan.schedule.map((item, idx) => (
                <li key={idx} className="p-2 border-b rounded bg-gray-50">{item}</li>
            ))}
        </ul>
    </div>
)}


      <AIChatBot context={{ syllabus: selectedSyllabus, studyPlan }} />
    </div>
  );
};

export default StudyPlanner;
