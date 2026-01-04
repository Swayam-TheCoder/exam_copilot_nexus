import React, { useState } from 'react';
import axios from 'axios';

function StudyPlanner() {
    const [syllabusId, setSyllabusId] = useState('');
    const [examDate, setExamDate] = useState('');
    const [hoursPerDay, setHoursPerDay] = useState(3);
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                'http://localhost:5001/api/study-plan',
                { syllabusId, examDate, hoursPerDay }
            );
            setPlan(res.data.studyPlan.plan);
        } catch (err) {
            alert('Failed to generate study plan',err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Study Planner</h1>

            <input
                className="border p-2 w-full mb-2"
                placeholder="Syllabus ID"
                value={syllabusId}
                onChange={e => setSyllabusId(e.target.value)}
            />

            <input
                type="date"
                className="border p-2 w-full mb-2"
                value={examDate}
                onChange={e => setExamDate(e.target.value)}
            />

            <input
                type="number"
                className="border p-2 w-full mb-4"
                value={hoursPerDay}
                onChange={e => setHoursPerDay(e.target.value)}
            />

            <button
                onClick={generatePlan}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
                {loading ? 'Generating...' : 'Generate Study Plan'}
            </button>

            <div className="mt-6">
                {plan.map((day, i) => (
                    <div key={i} className="border rounded p-4 mb-3">
                        <h3 className="font-semibold">{day.day}</h3>
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
