import React, { useState } from 'react';
import { sendAIMessage } from '../services/api';

const AIChatBot = ({ context = {} }) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [collapsed, setCollapsed] = useState(false);

    const handleSend = async () => {
        if (!message) return;
        const userMessage = { sender: 'user', text: message };
        setChat(prev => [...prev, userMessage]);
        setMessage('');

        const reply = await sendAIMessage(message, context);
        const aiMessage = { sender: 'ai', text: reply };
        setChat(prev => [...prev, userMessage, aiMessage]);
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 shadow-lg rounded-lg overflow-hidden flex flex-col">
            <div className="bg-indigo-600 text-white p-2 flex justify-between items-center cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
                <span>AI Study Assistant</span>
                <span className="font-bold">{collapsed ? '+' : '-'}</span>
            </div>

            {!collapsed && (
                <div className="flex-1 bg-white p-2 flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-2">
                        {chat.map((c, i) => (
                            <div key={i} className={`mb-1 flex ${c.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <span className={`p-2 rounded-lg max-w-xs ${c.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                                    {c.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Ask AI..."
                        />
                        <button onClick={handleSend} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChatBot;
