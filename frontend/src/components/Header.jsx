import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-bold">Smart Exam AI</h1>
            <nav className="space-x-4">
                <Link to="/" className="hover:text-gray-200">Home</Link>
                <Link to="/syllabus-upload" className="hover:text-gray-200">Upload Syllabus</Link>
                <Link to="/question-paper" className="hover:text-gray-200">Question Paper</Link>
                <Link to="/study-planner" className="hover:text-gray-200">Study Planner</Link>
            </nav>
        </header>
    );
};

export default Header;
