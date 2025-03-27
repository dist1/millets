import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";

const CollaborativeFarming = () => {
  const [username, setUsername] = useState("User");
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      window.location.href = "/";
    } else {
      setUsername(storedUsername);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-hidden shadow-md"
      style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}>
      <div className="layout-container flex h-full grow flex-col">
        
        {/* Navbar */} {/* Use Header component */}
        <Header activePage="Collab" logoutUser={logoutUser} />

        {/* Main Content */}
        <div className="layout-container flex h-full grow flex-col overflow-y-auto fade-content pt-10">
          {/* Collaborative Farming Section */}
          <div className="flex flex-1 flex-col px-32 py-10 text-center">
            <h1 className="text-[#1C160C] text-2xl font-bold pb-4">Collaborative Farming</h1>
            <p className="text-[#4A4A4A] text-lg pb-6">
              Join a community of farmers to share resources, exchange knowledge, and work together for better yields.
            </p>

            {/* Community Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#1C160C]">Farmer Forums</h3>
                <p className="text-sm text-[#4A4A4A] mt-2">
                  Discuss agricultural practices, seek advice, and share experiences.
                </p>
              </div>

              <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#1C160C]">Resource Sharing</h3>
                <p className="text-sm text-[#4A4A4A] mt-2">
                  Collaborate on bulk seed purchases, labor sharing, and equipment usage.
                </p>
              </div>

              <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#1C160C]">Expert Assistance</h3>
                <p className="text-sm text-[#4A4A4A] mt-2">
                  Get guidance from agricultural experts on best farming practices.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CollaborativeFarming;