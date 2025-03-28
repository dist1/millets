import React, { useState, useEffect, useRef } from "react";
import ProfileDropdown from "../components/ProfileDropdown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, parseISO } from 'date-fns';

const Tracker = () => {
  const [username, setUsername] = useState("User");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [expenses, setExpenses] = useState([
    { date: "2025-03-10", category: "Seeds & Fertilizers", amount: 3500 },
    { date: "2025-03-12", category: "Labor Cost", amount: 2000 },
    { date: "2025-03-14", category: "Equipment Maintenance", amount: 1800 },
  ]);
  const [newExpense, setNewExpense] = useState({ date: new Date(), category: "", amount: "" });
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
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

  const addExpense = () => {
    if (newExpense.date && newExpense.category && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount), date : format(newExpense.date, 'yyyy-MM-dd') }]);
      setNewExpense({ date: new Date(), category: "", amount: "" });
      setShowCalendar(false);
    }
  };

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const handleDateChange = (date) => {
    setNewExpense({ ...newExpense, date: date });
    setShowCalendar(false);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-hidden shadow-md" style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 text-sm bg-gradient-to-r from-purple-300 to-green-300 shadow-md">
          <div className="flex items-center gap-2 text-[#1C160C]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#1C160C] text-base font-bold tracking-[-0.015em]">
              <a href="/home">Millets</a>
            </h2>
          </div>

          <div className="flex items-center gap-5 text-xs text-[#1C160C] ml-auto">
            <a href="/home">Chatbot</a>
            <a href="/news">News</a>
            <a href="/shared">Shared Machineries</a>
            <a href="/collab">Collaborative Farming</a>
            <a href="/help" className="mr-6">
              Help & Support
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <a href="/calendar" className="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Calendar Icon" className="size-5" />
              </a>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Farming Calendar
              </div>
            </div>
             <div className="relative group">
              <a href="/tracker" className="flex items-center border-b-2 border-black mb-1 pb-1">
                <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="Finance Icon" className="size-5" />
              </a>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#D9534F] font-semibold">
                Finance Tracker
              </div>
            </div>

            <ProfileDropdown logoutUser={logoutUser} />
          </div>
        </header>

        <div className="layout-container flex h-full grow flex-col overflow-y-auto fade-content">
          <div className="flex flex-1 flex-col px-32 py-8 relative">
            <h1 className="text-[#1C160C] text-xl font-bold text-center pb-6">Finance Tracker</h1>

            <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold text-[#1C160C] mb-4">Expense Summary</h2>

              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#D9CFC0] text-[#1C160C]">
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">{format(parseISO(expense.date), 'MMMM dd, yyyy')}</td>
                      <td className="p-3">{expense.category}</td>
                      <td className="p-3 text-right">₹{expense.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex gap-2 relative">
                <input
                  type="text"
                  placeholder="Date"
                  value={format(newExpense.date, 'MMMM dd, yyyy')}
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="p-2 border rounded cursor-pointer"
                  readOnly
                />
                {showCalendar && (
                  <div className="absolute top-12 left-0 z-10">
                    <Calendar value={newExpense.date} onChange={handleDateChange} />
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Category"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="p-2 border rounded"
                />
                <button onClick={addExpense} className="bg-[#4CAF50] text-white p-2 rounded">
                  Add Expense
                </button>
              </div>
              <div className="mt-4 text-right">
                <p className="text-lg font-semibold">
                  Total Expenses: <span className="text-[#D9534F]">₹{totalExpenses.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;