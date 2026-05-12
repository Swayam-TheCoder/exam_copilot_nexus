// StudyPlanner.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const today = new Date().toISOString().split('T')[0];

const BASE_URL = 'https://exam-copilot-nexus.onrender.com/api/study-todos';

const StudyPlanner = () => {
    const [date, setDate] = useState(today);
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);

    // Load todos by date
    const loadTodos = async (selectedDate) => {
    try {
        const res = await axios.get(
            `${BASE_URL}?date=${selectedDate}`
        );

        setTodos(res.data);
    } catch (err) {
        console.error('Failed to load todos', err);
    }
};

    // Initial load
    useEffect(() => {
        loadTodos(today);
    }, []);

    const handleDateChange = async (e) => {
        const selectedDate = e.target.value;

        setDate(selectedDate);

        loadTodos(selectedDate);
    };

    const addTodo = async () => {
        if (!title.trim()) return;

        try {
            await axios.post(BASE_URL, {
                title,
                date
            });

            setTitle('');

            loadTodos(date);
        } catch (err) {
            console.error('Failed to add todo', err);
        }
    };

    const toggleTodo = async (id) => {
        try {
            await axios.patch(`${BASE_URL}/${id}`);

            loadTodos(date);
        } catch (err) {
            console.error('Failed to update todo', err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);

            loadTodos(date);
        } catch (err) {
            console.error('Failed to delete todo', err);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
                Study Planner
            </h2>

            <input
                type="date"
                className="border p-2 w-full mb-3"
                value={date}
                onChange={handleDateChange}
            />

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Add study task..."
                    className="border p-2 flex-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    onClick={addTodo}
                    className="bg-purple-600 text-white px-4 rounded"
                >
                    Add
                </button>
            </div>

            {todos.length === 0 && (
                <p className="text-gray-500 text-center">
                    No tasks for this day
                </p>
            )}

            {todos.map((todo) => (
                <div
                    key={todo._id}
                    className="flex justify-between items-center border p-2 mb-2 rounded"
                >
                    <span
                        onClick={() => toggleTodo(todo._id)}
                        className={`cursor-pointer ${
                            todo.completed
                                ? 'line-through text-gray-400'
                                : ''
                        }`}
                    >
                        {todo.title}
                    </span>

                    <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-red-500 font-bold"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default StudyPlanner;