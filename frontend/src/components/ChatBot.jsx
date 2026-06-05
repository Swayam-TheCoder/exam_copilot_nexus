import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Bot, Send, X } from "lucide-react";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  const sendMsg = async () => {
    if (!msg.trim() || loading) return;

    const currentMsg = msg;

    setChat((prev) => [
      ...prev,
      {
        from: "user",
        text: currentMsg,
      },
    ]);

    setMsg("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://exam-copilot-nexus.onrender.com/api/chat",
        {
          message: currentMsg,
        }
      );

      setChat((prev) => [
        ...prev,
        {
          from: "bot",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, something went wrong.",err,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(true)}
        className="
        fixed
        bottom-6
        right-6
        z-50
        p-4
        rounded-full
        bg-gradient-to-r
        from-purple-600
        to-pink-600
        shadow-xl
        hover:scale-110
        transition
        "
      >
        <Bot size={26} className="text-white" />
      </button>

      {/* Chat Window */}

      {open && (
        <div
          className="
          fixed
          inset-0
          z-[100]
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-2
          md:p-6
          "
        >
          <div
            className="
            w-full
            md:w-1/2
            h-[95vh]
            md:h-[85vh]
            bg-slate-950
            border
            border-white/10
            rounded-3xl
            shadow-2xl
            overflow-hidden
            flex
            flex-col
            "
          >
            {/* Header */}

            <div
              className="
              flex
              justify-between
              items-center
              px-6
              py-4
              bg-gradient-to-r
              from-purple-600
              to-pink-600
              "
            >
              <div className="flex items-center gap-2">
                <Bot />
                <h2 className="font-bold text-lg">
                  AI Study Assistant
                </h2>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="hover:rotate-90 transition"
              >
                <X />
              </button>
            </div>

            {/* Messages */}

            <div
              className="
              flex-1
              overflow-y-auto
              p-4
              space-y-4
              bg-gradient-to-b
              from-slate-950
              to-slate-900
              "
            >
              {chat.length === 0 && (
                <div className="text-center mt-10 text-slate-400">
                  Ask anything about your syllabus,
                  exams, or study plans.
                </div>
              )}

              {chat.map((c, i) => (
                <div
                  key={i}
                  className={`flex ${
                    c.from === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                    max-w-[85%]
                    px-4
                    py-3
                    rounded-2xl
                    whitespace-pre-wrap
                    break-words
                    ${
                      c.from === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white/10 text-slate-200 border border-white/10"
                    }
                    `}
                  >
                    {c.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div
                    className="
                    px-4
                    py-3
                    rounded-2xl
                    bg-white/10
                    border
                    border-white/10
                    text-slate-300
                    "
                  >
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}

            <div
              className="
              border-t
              border-white/10
              p-4
              bg-slate-950
              "
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && sendMsg()
                  }
                  placeholder="Ask a question..."
                  className="
                  flex-1
                  bg-white/5
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-purple-500
                  "
                />

                <button
                  onClick={sendMsg}
                  disabled={loading}
                  className="
                  px-5
                  rounded-xl
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-600
                  hover:scale-105
                  transition
                  disabled:opacity-50
                  "
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;