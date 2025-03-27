import React, { useState, useEffect, useRef } from "react";
import defaultProfileIcon from "../assets/images/default-profile-icon.jpg"; // ✅ Import local image

const ProfileDropdown = ({ logoutUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState("User"); // ✅ State for username
    const menuRef = useRef(null);

    // Fetch the username from localStorage on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername); // ✅ Set the actual username
        }
    }, []);

    // Toggle menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile Button */}
            <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 cursor-pointer"
                style={{ backgroundImage: `url(${defaultProfileIcon})` }} // ✅ Use local image
                onClick={toggleMenu}
            ></div>

            {/* Profile Dropdown */}
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-md z-50">
                    <span className="block text-center text-sm font-semibold text-gray-700 py-2 bg-gray-100 rounded-t-md">
                        {username} {/* ✅ Display actual username */}
                    </span>
                    <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            logoutUser();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;