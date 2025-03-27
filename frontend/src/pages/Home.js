import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { getGeminiResponse, getGeminiResponseWithImage } from "../utils/geminiAPI";

const Home = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [image, setImage] = useState(null);
    const chatInputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const lastMessageRef = useRef(null);
    const storedUsername = localStorage.getItem("username");

    useEffect(() => {
        if (!storedUsername) {
            window.location.href = "/";
        }

        const profileBtn = document.getElementById("profile-btn");
        const profileMenu = document.getElementById("profile-menu");
        const profileUsername = document.getElementById("profile-username");

        if (profileBtn && profileMenu && profileUsername) {
            profileUsername.textContent = storedUsername || "User";

            profileBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                alert(`Logged in as: ${storedUsername}`);
            });

            document.addEventListener("click", (event) => {
                if (!profileMenu.contains(event.target) && event.target.id !== "profile-btn") {
                    profileMenu.classList.add("hidden");
                }
            });
        }
    }, [storedUsername]);

    const logoutUser = () => {
        localStorage.removeItem("username");
        window.location.href = "/";
    };

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "instant", block: "nearest" });
        }
    }, [messages, isTyping]);

    const sendMessage = async () => {
        const message = inputValue.trim();
        if (!message && !image) return;

        setMessages((prev) => [...prev, { text: message, sender: "user", image: image?.name }]);
        setInputValue("");
        setImage(null);
        setIsTyping(true);

        try {
            let aiReply;
            if (image) {
                aiReply = await getGeminiResponseWithImage(image, message);
            } else {
                aiReply = await getGeminiResponse(message);
            }
            setMessages((prev) => [...prev, { text: aiReply, sender: "ai" }]);
        } catch (error) {
            console.error("AI Error:", error);
        }

        setIsTyping(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) setImage(file);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-hidden shadow-md"
            style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}>
            <div className="layout-container flex h-full grow flex-col">

                {/* Navbar */}
                <Header activePage="Chatbot" logoutUser={logoutUser} />

                {/* Chat Section */}
                <div className="flex-1 flex flex-col px-32 py-4 relative overflow-hidden fade-content pt-16">
                    <h1 className="text-[#1C160C] text-xl font-bold text-center pb-6 mt-6">Ask me anything about Farming</h1>

                    {/* Chat Messages */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto space-y-4 px-4"
                        style={{ maxHeight: "calc(100vh - 230px)", paddingBottom: "120px" }}>
                        {messages.map((msg, index) => (
                            <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`p-4 rounded-lg max-w-md ${msg.sender === "user" ? "bg-[#D1E8D1] text-right" : "bg-[#F6F3EE] text-left"}`}>
                                    <p className="text-sm text-[#1C160C] leading-tight whitespace-pre-wrap">{msg.text}</p>
                                    {msg.image && <p className="text-xs text-gray-500">📎 {msg.image}</p>}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="p-3 bg-[#F6F3EE] rounded-lg max-w-md">
                                    <div className="typing-indicator flex space-x-1">
                                        <span className="dot bg-[#A18249]"></span>
                                        <span className="dot bg-[#A18249]"></span>
                                        <span className="dot bg-[#A18249]"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chatbox */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white px-32 py-4 flex items-center gap-3 border-t border-gray-200">
                        {/* Image Upload Button */}
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                        <label htmlFor="image-upload" className="cursor-pointer p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition">
                            📷
                        </label>

                        <textarea
                            ref={chatInputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full text-sm px-4 py-3 border border-[#E9DFCE] rounded-full focus:outline-none focus:border-blue-500 bg-transparent placeholder:text-[#A18249] shadow-sm resize-none overflow-hidden"
                            placeholder="Type your questions here..."
                            rows="1"
                        ></textarea>

                        <button onClick={sendMessage} className="p-2 bg-[#019863] text-white rounded-full shadow-md hover:bg-[#017A4F] transition">
                            🚀
                        </button>
                    </div>
                </div>
            </div>

            {/* Typing Indicator CSS */}
            <style>
                {`
                .typing-indicator .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    display: inline-block;
                    animation: typing 1.5s infinite;
                }

                .typing-indicator .dot:nth-child(1) {
                    animation-delay: 0s;
                }
                .typing-indicator .dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .typing-indicator .dot:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.3; }
                }
                `}
            </style>
        </div>
    );
};

export default Home;