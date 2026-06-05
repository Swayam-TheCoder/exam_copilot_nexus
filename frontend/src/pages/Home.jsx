import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* HERO SECTION */}
      <section className="text-center mb-16">
        <h1
  className="
  text-4xl
  sm:text-5xl
  md:text-6xl
  lg:text-7xl
  font-black
  leading-tight
  bg-gradient-to-r
  from-cyan-400
  via-purple-400
  to-pink-400
  bg-clip-text
  text-transparent
  mb-6
  "
>
  Ace Your Exams with AI
</h1>
        <p
  className="
  text-base
  sm:text-lg
  md:text-xl
  text-slate-300
  max-w-3xl
  mx-auto
  "
>
  Generate question papers, create study plans, and
  learn faster using AI-powered exam preparation.
</p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/syllabus-upload"
            className="
px-8 py-4
rounded-xl
font-semibold
bg-gradient-to-r
from-indigo-500
to-purple-600
hover:scale-105
transition-all
duration-300
shadow-xl
"
          >
            Upload Syllabus
          </Link>

          <Link
            to="/study-planner"
            className="
px-8 py-4
rounded-xl
font-semibold
bg-gradient-to-r
from-cyan-500
to-blue-600
hover:scale-105
transition-all
duration-300
shadow-xl
"
          >
            Create Study Plan
          </Link>
        </div>
      </section>

        {/* Stats Section*/}

        <section className="grid md:grid-cols-3 gap-6 mb-20">

  <div className="bg-white/5 rounded-3xl p-8 text-center border border-white/10">
    <h3 className="text-4xl font-black text-cyan-400">
      AI
    </h3>
    <p className="text-slate-300">
      Powered Generation
    </p>
  </div>

  <div className="bg-white/5 rounded-3xl p-8 text-center border border-white/10">
    <h3 className="text-4xl font-black text-purple-400">
      24/7
    </h3>
    <p className="text-slate-300">
      Study Support
    </p>
  </div>

  <div className="bg-white/5 rounded-3xl p-8 text-center border border-white/10">
    <h3 className="text-4xl font-black text-pink-400">
      Smart
    </h3>
    <p className="text-slate-300">
      Planning System
    </p>
  </div>

</section>

      {/* FEATURES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div
          className="
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
md:p-8
hover:-translate-y-2
hover:border-cyan-400/40
transition-all
duration-300
"
        >
          <h3 className="text-xl font-semibold mb-2">Smart Question Papers</h3>
          <p className="text-gray-300">
            Generate balanced exam papers using syllabus analysis and AI-based
            difficulty control.
          </p>
        </div>

        <div
          className="
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
md:p-8
hover:-translate-y-2
hover:border-cyan-400/40
transition-all
duration-300
"
        >
          <h3 className="text-xl font-semibold mb-2">
            Personalized Study Plans
          </h3>
          <p className="text-gray-300">
            Get daily study schedules based on your syllabus, exam date, and
            available time.
          </p>
        </div>

        <div
          className="
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
md:p-8
hover:-translate-y-2
hover:border-cyan-400/40
transition-all
duration-300
"
        >
          <h3 className="text-xl font-semibold mb-2">AI Study Assistant</h3>
          <p className="text-gray-300">
            Chat with an AI assistant that understands your syllabus and guides
            your preparation.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="
bg-white/5
backdrop-blur-xl
border
border-white/10
rounded-3xl
p-6
md:p-8
text-center
"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          How It Works
        </h2>

        <ol
          className="
list-decimal
list-inside
space-y-4
text-slate-300
max-w-3xl
mx-auto
"
        >
          <li>Upload your college syllabus</li>
          <li>Let AI analyze topics and difficulty</li>
          <li>Generate question papers or study plans instantly</li>
          <li>Use the AI assistant for doubt-solving and revision</li>
        </ol>
      </section>

      {/* CTA SECTION */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Start Your Smart Exam Preparation Today
        </h2>
        <Link
          to="/syllabus-upload"
          className="
inline-block
px-6
md:px-8
py-3
md:py-4
rounded-xl
font-semibold
bg-gradient-to-r
from-purple-500
to-pink-500
hover:scale-105
transition-all
duration-300
shadow-xl
text-white
">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
