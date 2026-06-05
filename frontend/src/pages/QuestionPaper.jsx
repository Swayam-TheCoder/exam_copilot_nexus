import React, { useState, useEffect } from "react";
import {
  createQuestionPaper,
  downloadQuestionPaperPDF,
  getSyllabi,
} from "../services/api";
import Loader from "../components/Loader";

const QuestionPaper = () => {
  const [syllabi, setSyllabi] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState("");
  const [questionPaper, setQuestionPaper] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch syllabi on page load
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

  const handleGenerate = async () => {
    if (!selectedSyllabus) {
      alert("Please select a syllabus");
      return;
    }

    setLoading(true);
    try {
      const res = await createQuestionPaper({ syllabusId: selectedSyllabus });
      if (res.success) setQuestionPaper(res.questionPaper);
      else alert("Failed to generate paper");
    } catch (err) {
      console.error(err);
      alert("Error generating question paper");
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
      <h2 className="text-xl font-bold mb-4">Generate Question Paper</h2>

      <select
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
mb-4
"
        value={selectedSyllabus}
        onChange={(e) => setSelectedSyllabus(e.target.value)}
      >
        <option value="">Select Syllabus</option>
        {syllabi.map((s) => (
          <option key={s._id} value={s._id}>
            {s.courseName}
          </option>
        ))}
      </select>

      <div
        className="
bg-black/20
border
border-white/10
rounded-2xl
p-6
"
      >
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-purple-600 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 mt-3"
        >
          Generate Paper
        </button>
        {loading && <Loader />}

        {questionPaper && (
          <button
            onClick={() => downloadQuestionPaperPDF(selectedSyllabus)}
            className="
px-5 py-2
rounded-xl
bg-gradient-to-r
from-green-500
to-emerald-600
text-white
font-medium
hover:scale-105
transition
"
          >
            Download PDF
          </button>
        )}
      </div>

      {questionPaper?.questions?.length > 0 && (
        <div
className="
bg-black/20
backdrop-blur-xl
border
border-white/10
rounded-2xl
p-6
mt-6
"
>
          <h3 className="text-lg font-bold mb-2">Generated Question Paper</h3>
          <ul className="list-decimal pl-5 space-y-1">
            {questionPaper.questions.map((q, idx) => (
              <li key={idx} className="
py-3
border-b
border-white/10
text-slate-300
"
>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionPaper;
