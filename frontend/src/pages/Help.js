import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const faqs = [
  { question: "How can I check soil quality?", answer: "You can use our AI tool to analyze soil samples and get detailed recommendations." },
  { question: "What crops are best for my region?", answer: "Our AI-powered recommendation system suggests the best crops based on weather, soil, and market trends." },
  { question: "How do I apply for government farming schemes?", answer: "Visit the government portal or check our chatbot for scheme eligibility and application details." },
  { question: "How can I prevent pest infestations?", answer: "Regularly monitor crops, use organic pesticides, and follow crop rotation methods." },
  { question: "What irrigation methods are best for small farms?", answer: "Drip irrigation and sprinkler systems are effective for conserving water while maintaining crop health." },
  { question: "Where can I get high-quality seeds?", answer: "Check with certified agricultural suppliers or government-approved seed banks for quality seeds." }
];

const testimonials = [
  { name: "Rajesh Kumar", feedback: "The AI-powered farming tool helped me choose the right crops and increased my yield!" },
  { name: "Suman Patel", feedback: "I love how easy it is to get accurate soil analysis reports using this platform." },
  { name: "Amit Verma", feedback: "The FAQs and farming tips have been a game changer for my farm!" }
];

export default function HelpSupport() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div
      className="relative flex flex-col min-h-screen bg-white overflow-hidden"
      style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}
    >
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Header activePage="Help" logoutUser={logoutUser} />
      </div>

      {/* Help & Support Section */}
      <div className="flex flex-1 flex-col overflow-y-auto pt-24 px-32 py-10 text-center">
        <h1 className="text-[#1C160C] text-2xl font-bold pb-4">Help & Support</h1>
        <p className="text-[#4A4A4A] text-lg pb-6">
          Need assistance? Find answers below or contact us for support.
        </p>

        {/* FAQ Section */}
        <div className="text-left max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#1C160C] pb-2">Frequently Asked Questions</h2>
          {[
            {
              question: "How do I use the chatbot?",
              answer: "Simply type your question in the chatbot, and it will provide relevant farming advice.",
            },
            {
              question: "Is there support for regional languages?",
              answer: "Yes! Our chatbot supports multiple regional languages for better communication.",
            },
            {
              question: "How can I share farming equipment?",
              answer: "Use the 'Shared Machineries' section to list available equipment or find shared resources.",
            },
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
            <input
              type="text"
              className="w-full p-2 border rounded mt-1 mb-4"
              placeholder="Enter your name"
            />

            <label className="block text-sm font-medium text-[#1C160C]">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1 mb-4"
              placeholder="Enter your email"
            />

            <label className="block text-sm font-medium text-[#1C160C]">Your Query</label>
            <textarea
              className="w-full p-2 border rounded mt-1 mb-4"
              rows="4"
              placeholder="Describe your issue"
            ></textarea>

            <button
              type="submit"
              className="w-full p-2 bg-[#019863] text-white rounded hover:bg-[#017A4F] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;