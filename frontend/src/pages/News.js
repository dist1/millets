import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const News = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      navigate("/"); // Redirect to login if not logged in
    } else {
      setUsername(storedUsername);
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
      <Header activePage="News" logoutUser={logoutUser} />

      {/* Main Content */}
      <div className="flex flex-col px-32 py-10 text-center fade-content pt-20">
        <h1 className="text-[#1C160C] text-2xl font-bold pb-4">Smart Farming-related News</h1>
        <p className="text-[#4A4A4A] text-lg pb-6">
          Stay updated with the latest developments in agriculture, market trends, government policies, and innovations in farming.
        </p>

        {/* News Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1C160C]">Agriculture Market Updates</h3>
            <p className="text-sm text-[#4A4A4A] mt-2">Latest insights on crop prices, supply-demand trends, and government policies.</p>
          </div>

          <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1C160C]">Innovations in Smart Farming</h3>
            <p className="text-sm text-[#4A4A4A] mt-2">Explore the latest technological advancements in precision farming and AI-powered tools.</p>
          </div>

          <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1C160C]">Weather & Climate Reports</h3>
            <p className="text-sm text-[#4A4A4A] mt-2">Get accurate forecasts and climate-related updates to plan farming activities better.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default News;