import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaPaperPlane, FaPlus, FaHistory } from "react-icons/fa";
import ChatbotSidebar from "./ChatbotSidebar.jsx";
import { Tooltip } from "react-tooltip";

const API_KEY = "AIzaSyB5DlOlT9ZXNlLmWzeEN0fHYrh8YgEKxws"; // API Key for Google Gemini API

const healthDescription = `
You are a helpful health assistant who answers basic health, wellness, fitness, and lifestyle questions. 
Keep the tone friendly and easy to understand. Do not give prescriptions. Always suggest consulting a doctor for serious conditions.
`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSidebar] = useState(true);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! I am your health assistant. What do you want to know?" }
    ]);
    const [chatHistory, setChatHistory] = useState([]);
    const [query, setQuery] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const navigate = useNavigate();
    const chatEndRef = useRef(null);

    // ✅ Load chat history from localStorage on mount
    useEffect(() => {
        const storedHistory = localStorage.getItem("chatHistory");
        if (storedHistory) {
            setChatHistory(JSON.parse(storedHistory));
        }
    }, []);

    // ✅ Save chat history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }, [chatHistory]);

    if (!showSidebar) return null;

    const appendMessage = (sender, text) => {
        setMessages((prev) => [...prev, { sender, text }]);
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
        appendMessage("user", query);
        const userMsg = query;
        setQuery("");

        appendMessage("bot", "Typing...");

        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `Answer the following as a health assistant: ${healthDescription}. Question: ${userMsg}`,
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );
            const data = await res.json();
            setMessages((prev) => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1] = {
                    sender: "bot",
                    text: data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond.",
                };
                return newMsgs;
            });
        } catch (error) {
            setMessages((prev) => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1] = {
                    sender: "bot",
                    text: "Error occurred while fetching response.",
                };
                return newMsgs;
            });
        }
    };

    const startNewChat = () => {
        // Save current chat to history
        if (messages.length > 0) {
            setChatHistory((prev) => [...prev, messages]);
        }
        setMessages([{ sender: "bot", text: "New chat started. What do you want to know?" }]);
        setShowHistory(false);
    };

    const loadChatFromHistory = (index) => {
        setMessages(chatHistory[index]);
        setShowHistory(false);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="relative h-screen flex">
            {/* Close button */}
            <button
                className="fixed top-4 right-4 z-50 bg-white text-gray-900 rounded-full p-2 shadow hover:bg-gray-200 transition"
                onClick={() => navigate("/")}
            >
                <FaTimes size={20} />
            </button>

            {/* Sidebar */}
            <motion.div
                initial={{ width: 60 }}
                animate={{ width: isOpen ? 240 : 60 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 h-screen text-white p-4 flex flex-col gap-6"
            >
                <button className="text-xl mb-4" onClick={() => setIsOpen((prev) => !prev)}>
                    <FaBars />
                </button>

                {/* New Chat */}
                <div
                    className="flex items-center gap-4 cursor-pointer hover:text-blue-400"
                    onClick={startNewChat}
                >
                    <FaPlus /> {isOpen && <span>New Chat</span>}
                </div>

                {/* Chat History */}
                <div
                    className="flex items-center gap-4 cursor-pointer hover:text-blue-400"
                    onClick={() => setShowHistory((prev) => !prev)}
                >
                    <FaHistory /> {isOpen && <span>Chat History</span>}
                </div>
            </motion.div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col bg-gray-50 p-4">
                {showHistory ? (
                    <div className="overflow-y-auto">
                        <h2 className="font-bold mb-3">Chat History</h2>
                        {chatHistory.length === 0 && <p>No chats yet.</p>}
                        {chatHistory.map((chat, idx) => (
                            <div
                                key={idx}
                                className="p-3 mb-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                                onClick={() => loadChatFromHistory(idx)}
                            >
                                <strong>Chat {idx + 1}</strong> - {chat.length} messages
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`p-3 rounded-xl max-w-[70%] w-fit ${
                                        msg.sender === "user"
                                            ? "ml-auto bg-blue-500 text-white"
                                            : "mr-auto bg-gray-200 text-gray-900"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={chatEndRef}></div>
                        </div>

                        {/* Input */}
                        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-300">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="flex-1 outline-none px-3 py-2 rounded-xl bg-gray-100"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {!isOpen && <Tooltip id="sidebar-tooltip" offset={40} />}
        </div>
    );
};

export default Chatbot;
