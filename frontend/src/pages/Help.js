import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Help = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/");
    }
  }, [navigate]);

  const logoutUser = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-hidden shadow-md"
      style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}>
      <div className="layout-container flex h-full grow flex-col">
      
      {/* Navbar */} {/* Use Header component */}
      <Header activePage="Help" logoutUser={logoutUser} />

      {/* Help & Support Section */}
      <div className="layout-container flex h-full grow flex-col overflow-y-auto fade-content pt-10">
        <div className="flex flex-1 flex-col px-32 py-10 text-center">
          <h1 className="text-[#1C160C] text-2xl font-bold pb-4">Help & Support</h1>
          <p className="text-[#4A4A4A] text-lg pb-6">
            Need assistance? Find answers below or contact us for support.
          </p>

          {/* FAQ Section */}
          <div className="text-left max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-[#1C160C] pb-2">Frequently Asked Questions</h2>
            {[
              { question: "How do I use the chatbot?", answer: "Simply type your question in the chatbot, and it will provide relevant farming advice." },
              { question: "Is there support for regional languages?", answer: "Yes! Our chatbot supports multiple regional languages for better communication." },
              { question: "How can I share farming equipment?", answer: "Use the 'Shared Machineries' section to list available equipment or find shared resources." }
            ].map((faq, index) => (
              <div key={index} className="bg-[#F6F3EE] p-4 rounded-lg shadow-md mb-3">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="text-sm text-[#4A4A4A] mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mt-8">
            <h2 className="text-lg font-semibold text-[#1C160C] pb-2">Contact Us</h2>
            <form className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-[#1C160C]">Your Name</label>
              <input type="text" className="w-full p-2 border rounded mt-1 mb-4" placeholder="Enter your name" />

              <label className="block text-sm font-medium text-[#1C160C]">Email</label>
              <input type="email" className="w-full p-2 border rounded mt-1 mb-4" placeholder="Enter your email" />

              <label className="block text-sm font-medium text-[#1C160C]">Your Query</label>
              <textarea className="w-full p-2 border rounded mt-1 mb-4" rows="4" placeholder="Describe your issue"></textarea>

              <button type="submit" className="w-full p-2 bg-[#019863] text-white rounded hover:bg-[#017A4F] transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Help;