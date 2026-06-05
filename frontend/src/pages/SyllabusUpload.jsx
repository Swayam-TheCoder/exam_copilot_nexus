import React, { useState } from "react";
import { uploadSyllabus } from "../services/api";

const SyllabusUpload = () => {
  const [courseName, setCourseName] = useState("");
  const [units, setUnits] = useState([{ unitName: "", topics: [""] }]);

  const handleUnitChange = (index, value) => {
    const updatedUnits = [...units];
    updatedUnits[index].unitName = value;
    setUnits(updatedUnits);
  };

  const handleTopicChange = (unitIndex, topicIndex, value) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].topics[topicIndex] = value;
    setUnits(updatedUnits);
  };

  const addUnit = () => {
    setUnits([...units, { unitName: "", topics: [""] }]);
  };

  const addTopic = (unitIndex) => {
    const updatedUnits = [...units];
    updatedUnits[unitIndex].topics.push("");
    setUnits(updatedUnits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clean data
    const cleanedUnits = units
      .map((unit) => ({
        unitName: unit.unitName.trim(),
        topics: unit.topics.filter((topic) => topic.trim() !== ""),
      }))
      .filter((unit) => unit.unitName !== "" && unit.topics.length > 0);

    // Validation
    if (!courseName.trim()) {
      alert("Course name is required");
      return;
    }

    if (cleanedUnits.length === 0) {
      alert("Add at least one valid unit");
      return;
    }

    try {
      await uploadSyllabus({
        courseName: courseName.trim(),
        units: cleanedUnits,
      });

      alert("Syllabus Uploaded");

      setCourseName("");
      setUnits([{ unitName: "", topics: [""] }]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div
      className="
max-w-4xl
mx-auto
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-8
"
    >
      <h2 className="text-3xl font-bold text-white mb-8">Upload Syllabus</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          className="
w-full
bg-slate-900/50
rounded-xl
p-3
text-white
focus:border-cyan-400
outline-none
mb-3
"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        {units.map((unit, i) => (
          <div key={i} className="mb-4 p-3 rounded">
            <input
              type="text"
              placeholder={`Unit ${i + 1} Name`}
              className="
w-full
bg-slate-900/50
rounded-xl
p-3
text-white
focus:border-cyan-400
outline-none
mb-3
"
              value={unit.unitName}
              onChange={(e) => handleUnitChange(i, e.target.value)}
            />

            {unit.topics.map((topic, j) => (
              <input
                key={j}
                type="text"
                placeholder={`Topic ${j + 1}`}
                className="
w-full
bg-slate-900/50
rounded-xl
p-3
text-white
focus:border-cyan-400
outline-none
mb-3
"
                value={topic}
                onChange={(e) => handleTopicChange(i, j, e.target.value)}
              />
            ))}

            <button
              type="button"
              onClick={() => addTopic(i)}
              className="bg-green-500 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 mt-4"
            >
              Add Topic
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addUnit}
          className="bg-red-700 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300"
        >
          Add Unit
        </button>

        <br />

        <button
          type="submit"
          className="bg-purple-600 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 mt-3">
          Upload Syllabus
        </button>
      </form>
    </div>
  );
};

export default SyllabusUpload;
