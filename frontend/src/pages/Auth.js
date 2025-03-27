import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  // State for authentication mode (Login/Register)
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect user if already logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      navigate("/home"); // Redirect to Home
    }
  }, [navigate]);

  // Toggle between Login & Register mode
  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setUsername(""); // Clear username field
    setPassword(""); // Clear password field
    setErrorMessage(""); // Reset error message
  };

  // Handle form submission
  const submitForm = async () => {
    console.log("Submit button clicked");
    console.log("Username:", username, "Password:", password);
  
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
  
    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      console.log("Response received:", response);
  
      if (!response.ok) {
        console.log(`HTTP Error: ${response.status}`);
        throw new Error(`HTTP Error ${response.status}`);
      }
  
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        setErrorMessage("Server returned an invalid response.");
        return;
      }
  
      console.log("Parsed response:", result);
  
      if (result.token) { 
        console.log("Login successful, redirecting...");
        localStorage.setItem("username", username);
        localStorage.setItem("token", result.token);
        setTimeout(() => navigate("/home"), 500);
      } else if (result.message === "User registered successfully") {
        console.log("Registration successful, logging in...");
        setErrorMessage(""); // Clear error messages
        localStorage.setItem("username", username);

        // Auto-login after successful registration
        const loginResponse = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const loginResult = await loginResponse.json();

        if (loginResponse.ok && loginResult.token) {
          localStorage.setItem("token", loginResult.token); // Store token properly
          setTimeout(() => navigate("/home"), 500); // Redirect to Home
        } else {
          setErrorMessage("Registration successful, but auto-login failed. Please sign in.");
          setIsLogin(true);
        }
      } else {
        console.log("Registration failed:", result.message);
        setErrorMessage(result.message || "Registration failed");
      }          
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
};


  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission behavior
      submitForm();
    }
  };

  return (
    <div 
      className="flex flex-col min-h-screen bg-[#FFFFFF]" 
      style={{ fontFamily: "Epilogue, 'Noto Sans', sans-serif" }}
      onKeyDown={handleKeyDown} // Listening for Enter key
    >
      {/* Header */}
      <header className="flex flex-col items-center justify-center border-b border-solid border-b-[#F4EFE6] px-8 py-4">
        <div className="flex items-center gap-2 text-[#1C160C]">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-[#1C160C] text-xl font-bold tracking-[-0.015em]">Millets</h2>
        </div>
      </header>

      {/* Auth Form */}
      <div className="layout-container flex h-full grow flex-col overflow-y-auto fade-content">
        <div className="flex flex-1 justify-center py-5 px-20">
          <div className="w-[400px] max-w-[400px] py-5 flex flex-col">
            <h1 className="text-[#1C160C] text-lg font-bold text-center pb-2">
              {isLogin ? "Sign in or create an account" : "Register or log in to your account"}
            </h1>

            {/* Username Input */}
            <div className="flex max-w-[400px] flex-wrap items-end gap-4 px-3 py-2">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1C160C] text-sm font-medium pb-1">Username</p>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full resize-none rounded-lg border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] h-10 placeholder:text-[#A18249] p-[10px] text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>

            {/* Password Input */}
            <div className="flex max-w-[400px] flex-wrap items-end gap-4 px-3 py-2">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1C160C] text-sm font-medium pb-1">Password</p>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full resize-none rounded-lg border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] h-10 placeholder:text-[#A18249] p-[10px] text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex px-3 py-2 justify-end flex-col w-full">
              <button
                onClick={submitForm}
                className="min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-8 px-3 bg-[#019863] text-[#FFFFFF] text-sm font-bold"
              >
                {isLogin ? "Sign In" : "Register"}
              </button>
              {errorMessage && <p className="text-red-600 text-sm px-3 py-1">{errorMessage}</p>}
            </div>

            {/* Toggle Login/Register */}
            <div className="p-3">
              <div className="flex flex-col items-start gap-3 rounded-lg border border-[#E9DFCE] bg-[#FFFFFF] p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-[#1C160C] text-sm font-bold">
                    {isLogin ? "New to Millet Farming Chatbot?" : "Already have an account?"}
                  </p>
                  <p className="text-[#A18249] text-sm">
                    {isLogin
                      ? "Join now to access our knowledge base and community support."
                      : "Welcome back! Log in to continue exploring millet farming."}
                  </p>
                </div>
                <button
                  onClick={toggleAuth}
                  className="min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-6 px-3 bg-[#019863] text-[#FFFFFF] text-xs font-medium"
                >
                  {isLogin ? "Register" : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;