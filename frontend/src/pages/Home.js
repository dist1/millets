import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { getGeminiResponse } from "../utils/geminiAPI";

const Home = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatInputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const lastMessageRef = useRef(null);
    const storedUsername = localStorage.getItem("username");

    useEffect(() => {
        // Redirect if user is not logged in
        if (!storedUsername) {
            window.location.href = "/";
        }

        // Profile menu toggle
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
        if (!message) return;

        setMessages((prev) => [...prev, { text: message, sender: "user" }]);
        setInputValue("");
        setIsTyping(true);

        try {
            const aiReply = await getGeminiResponse(message);
            setMessages((prev) => [...prev, { text: aiReply, sender: "ai" }]);
        } catch (error) {
            console.error("AI Error:", error);
        }

        setIsTyping(false);
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

            {/* Navbar */} {/* Use Header component */}
            <Header activePage="Chatbot" logoutUser={logoutUser} />

            {/* Chat Section */}
            <div className="flex-1 flex flex-col px-32 py-4 relative overflow-hidden fade-content pt-16">
                <h1 className="text-[#1C160C] text-xl font-bold text-center pb-6 mt-6">Ask me anything about Farming</h1>

                {/* Chat Messages */}
                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto space-y-4 px-4"
                    style={{ maxHeight: "calc(100vh - 230px)", paddingBottom: "120px" }} // Adjust padding & height
                >
                    {messages.map((msg, index) => (
                        <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`p-4 rounded-lg max-w-md ${msg.sender === "user" ? "bg-[#D1E8D1] text-right" : "bg-[#F6F3EE] text-left"}`}>
                                <p className="text-sm text-[#1C160C] leading-tight whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="p-4 bg-[#F6F3EE] rounded-lg max-w-md">
                                <p className="text-sm text-[#A18249] font-bold">...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chatbox */}
                <div className="fixed bottom-0 left-0 right-0 bg-white px-32 py-4 flex items-center gap-3 border-t border-gray-200">
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
        </div>
    );
};

export default Home;