import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const SharedMachineries = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
                    <Header activePage="Shared" logoutUser={logoutUser} />

                    {/* Shared Machineries Section */}
                    <div className="layout-container flex h-full grow flex-col overflow-y-auto fade-content px-32 py-10 text-center pt-20">
                        <h1 className="text-[#1C160C] text-2xl font-bold pb-4">Shared Machineries</h1>
                        <p className="text-[#4A4A4A] text-lg pb-6">
                            Collaborate with fellow farmers by sharing tools and machinery to optimize resources and reduce costs.
                        </p>

                        {/* Shared Equipment Listings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-[#1C160C]">Tractor Rental</h3>
                                <p className="text-sm text-[#4A4A4A] mt-2">
                                    Share or rent tractors in your area to save money and maximize efficiency.
                                </p>
                            </div>

                            <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-[#1C160C]">Seed Sowing Machines</h3>
                                <p className="text-sm text-[#4A4A4A] mt-2">
                                    Access advanced sowing machines without the need for full ownership.
                                </p>
                            </div>

                            <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-[#1C160C]">Irrigation Systems</h3>
                                <p className="text-sm text-[#4A4A4A] mt-2">
                                    Join cooperative irrigation initiatives for efficient water usage.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    );
};

export default SharedMachineries;