import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";

const Calendar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    // Redirect to login if no user is found
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate]);

  const logoutUser = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-hidden shadow-md"
      style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        
        {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 text-sm bg-gradient-to-r from-purple-300 to-green-300 shadow-md">
          <div className="flex items-center gap-2 text-[#1C160C]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                  fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#1C160C] text-base font-bold tracking-[-0.015em]"><a href="/home">Millets</a></h2>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-5 text-xs text-[#1C160C] ml-auto">
            <Link to="/home">Chatbot</Link>
            <Link to="/news">News</Link>
            <Link to="/shared">Shared Machineries</Link>
            <Link to="/collab">Collaborative Farming</Link>
            <Link to="/help" className="mr-6">Help & Support</Link>
          </div>

          <div className="flex items-center gap-6">
            {/* Farming Calendar Icon */}
            <div className="relative group">
              <Link to="/calendar" className="flex items-center border-b-2 border-black mb-1 pb-1">
                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Calendar Icon" className="size-5" />
              </Link>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#D9534F] font-semibold">
                Farming Calendar
              </div>
            </div>

            {/* Finance Tracker Icon */}
            <div className="relative group">
              <Link to="/tracker" className="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="Finance Icon" className="size-5" />
              </Link>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Finance Tracker
              </div>
            </div>

            {/* Profile Picture */}
            <ProfileDropdown logoutUser={logoutUser} />
          </div>
        </header>

        {/* Main Content */}
        <div className="layout-container flex h-full grow flex-col overflow-y-auto fade-content">
          <div className="flex flex-1 flex-col px-32 py-8 relative">
            <h1 className="text-[#1C160C] text-xl font-bold text-center pb-6">Farming Calendar</h1>

            {/* Calendar Section */}
            <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
              {/* Month and Year Selector */}
              <div className="flex justify-between items-center mb-4">
                <button className="text-[#019863] font-semibold">&lt; Previous</button>
                <h2 className="text-lg font-bold text-[#1C160C]">March 2025</h2>
                <button className="text-[#019863] font-semibold">Next &gt;</button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 text-sm text-center text-[#1C160C]">
                <div className="font-bold">Sun</div>
                <div className="font-bold">Mon</div>
                <div className="font-bold">Tue</div>
                <div className="font-bold">Wed</div>
                <div className="font-bold">Thu</div>
                <div className="font-bold">Fri</div>
                <div className="font-bold">Sat</div>

                {/* Empty slots for alignment */}
                <div></div> <div></div> <div></div> <div></div> <div>1</div> <div>2</div> <div>3</div>
                <div>4</div> <div>5</div> <div>6</div> <div>7</div> <div>8</div> <div>9</div> <div>10</div>
                <div>11</div> <div>12</div> <div>13</div> <div>14</div> <div>15</div> <div>16</div> <div>17</div>
                <div>18</div> <div>19</div> <div>20</div> <div>21</div> <div>22</div> <div>23</div> <div>24</div>
                <div>25</div> <div>26</div> <div>27</div> <div>28</div> <div>29</div> <div>30</div> <div>31</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;