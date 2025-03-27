// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import "../index.css";

const Header = ({ activePage, logoutUser }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
      setTimeout(() => setFadeIn(true), 100); // Small delay to trigger animation
    }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-3 text-sm bg-gradient-to-r from-purple-300 to-green-300 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 text-[#1C160C]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" 
              fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#1C160C] text-base font-bold tracking-[-0.015em]">
          <Link to="/home">Millets</Link>
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className={`flex items-center gap-5 text-xs text-[#1C160C] ml-auto`}>
        <Link to="/home" className={activePage === "Chatbot" ? "text-[#D9534F] font-semibold" : ""}>Chatbot</Link>
        <Link to="/news" className={activePage === "News" ? "text-[#D9534F] font-semibold" : ""}>News</Link>
        <Link to="/shared" className={activePage === "Shared" ? "text-[#D9534F] font-semibold" : ""}>Shared Machineries</Link>
        <Link to="/collab" className={activePage === "Collab" ? "text-[#D9534F] font-semibold" : ""}>Collaborative Farming</Link>
        <Link 
          to="/help" 
          className={`mr-6 ${activePage === "Help" ? "text-[#D9534F] font-semibold" : ""}`}
        >
          Help & Support
        </Link>
      </nav>

      {/* Icons & Profile */}
      <div className="flex items-center gap-6">
        {/* Farming Calendar */}
        <div className="relative group">
          <Link to="/calendar" className="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Calendar Icon" className="size-5" />
          </Link>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Farming Calendar
          </div>
        </div>

        {/* Finance Tracker */}
        <div className="relative group">
          <Link to="/tracker" className="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="Finance Icon" className="size-5" />
          </Link>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Finance Tracker
          </div>
        </div>

        {/* Profile Dropdown */}
        <ProfileDropdown logoutUser={logoutUser} />
      </div>
    </header>
  );
};

export default Header;