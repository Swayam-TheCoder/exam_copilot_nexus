import React, { useEffect, useState } from "react";
import { getSyllabi, generateStudyPlan } from "../services/api";
import Loader from "../components/Loader";

const StudyPlanner = () => {
  const [syllabi, setSyllabi] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(3);

  const [studyPlan, setStudyPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSyllabi = async () => {
      try {
        const data = await getSyllabi();
        setSyllabi(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSyllabi();
  }, []);

  const handleGeneratePlan = async () => {
    if (!selectedSyllabus) {
      alert("Please select a syllabus");
      return;
    }

    if (!examDate) {
      alert("Please select exam date");
      return;
    }

    setLoading(true);

    try {
      const res = await generateStudyPlan(
        selectedSyllabus,
        examDate,
        hoursPerDay
      );

      if (res.success) {
        setStudyPlan(res.studyPlan);
      } else {
        alert("Failed to generate study plan");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating study plan");
    }

    setLoading(false);
  };

  return (
    <div
      className="
      max-w-5xl
      mx-auto
      bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-8
      "
    >
      <h2
        className="
        text-3xl
        font-bold
        text-white
        mb-8
        "
      >
        AI Study Planner
      </h2>

      <div className="space-y-5">
        <select
          value={selectedSyllabus}
          onChange={(e) => setSelectedSyllabus(e.target.value)}
          className="
w-full
bg-slate-900/80
border
border-cyan-500/20
rounded-2xl
p-4
text-white
outline-none
focus:border-cyan-500
focus:ring-2
focus:ring-cyan-500/20
transition-all
duration-300
"
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
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="
w-full
bg-slate-900/80
border
border-purple-500/20
rounded-2xl
p-4
text-white
outline-none
focus:border-purple-500
focus:ring-2
focus:ring-purple-500/20
transition-all
duration-300
"
        />

        <input
          type="number"
          min="1"
          max="12"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
          placeholder="Hours per day"
          className="
w-full
bg-slate-900/80
border
border-purple-500/20
rounded-2xl
p-4
text-white
outline-none
focus:border-purple-500
focus:ring-2
focus:ring-purple-500/20
transition-all
duration-300
"
        />

        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          className="
          px-6
          py-3
          rounded-xl
          bg-gradient-to-r
          from-purple-500
          to-pink-500
          text-white
          font-semibold
          hover:scale-105
          transition
          "
        >
          {loading ? "Generating..." : "Generate Study Plan"}
        </button>
      </div>

      {studyPlan?.plan?.length > 0 && (
        <div
          className="
          mt-10
          bg-black/20
          border
          border-white/10
          rounded-2xl
          p-6
          "
        >
          <h3
            className="
            text-2xl
            font-bold
            text-white
            mb-6
            "
          >
            Generated Study Plan
          </h3>

          <div className="space-y-5">
            {studyPlan.plan.map((dayPlan, index) => (
              <div
                key={index}
                className="
                bg-white/5
                border
                border-white/10
                rounded-xl
                p-5
                "
              >
                <h4
                  className="
                  text-lg
                  font-semibold
                  text-cyan-400
                  mb-3
                  "
                >
                  {dayPlan.day}
                </h4>

                <ul className="list-disc pl-5 space-y-2">
                  {dayPlan.tasks.map((task, i) => (
                    <li
                      key={i}
                      className="
                      text-slate-300
                      "
                    >
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;