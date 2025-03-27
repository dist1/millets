import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ProfileDropdown from "../components/ProfileDropdown";

import { format, addDays, parseISO  } from "date-fns";

function CropPlanner({ userId }) {
  const [pastEvents, setPastEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(parseISO("2025-03-28"));
  const [formData, setFormData] = useState({ cropType: "", stage: "" });
  const [upcomingOperations, setUpcomingOperations] = useState([]);
  const croptimeline = {
    Wheat: [
      { stage: "Sowing", day: 1, details: "Sow seeds at 2 cm depth." },
      { stage: "Irrigation", day: 10, details: "First irrigation after 10 days." },
      { stage: "Fertilizing", day: 20, details: "Apply Urea-N fertilizer." },
      { stage: "Pest Control", day: 30, details: "Use pesticide spray for aphids." },
      { stage: "Harvesting", day: 90, details: "Harvest at full maturity." },
    ],
    Rice: [
      { stage: "Sowing", day: 1, details: "Use transplanting method." },
      { stage: "Irrigation", day: 7, details: "Maintain 3-5 cm water level." },
      { stage: "Fertilizing", day: 15, details: "Apply DAP and Potash." },
      { stage: "Pest Control", day: 35, details: "Use neem oil spray for insects." },
      { stage: "Harvesting", day: 120, details: "Cut at golden grain stage." },
    ],
    Maize: [
      { stage: "Sowing", day: 1, details: "Plant seeds at 5 cm depth." },
      { stage: "Irrigation", day: 12, details: "Water weekly based on soil moisture." },
      { stage: "Fertilizing", day: 22, details: "Apply nitrogen-rich fertilizer." },
      { stage: "Pest Control", day: 45, details: "Use bio-pesticides for worm control." },
      { stage: "Harvesting", day: 100, details: "Harvest when cobs turn yellow." },
    ],
    Cotton: [
      { stage: "Sowing", day: 1, details: "Plant seeds at 2 cm depth." },
      { stage: "Watering", day: 15, details: "Water lightly every week." },
      { stage: "Fertilizing", day: 25, details: "Apply potassium fertilizer." },
      { stage: "Pest Control", day: 50, details: "Use pesticides for bollworm." },
      { stage: "Harvesting", day: 150, details: "Harvest when bolls open." },
    ],
    Tomato: [
      { stage: "Sowing", day: 1, details: "Plant seedlings in rows." },
      { stage: "Watering", day: 5, details: "Water daily during dry periods." },
      { stage: "Fertilizing", day: 15, details: "Use nitrogen-rich fertilizer." },
      { stage: "Pest Control", day: 30, details: "Use organic insecticides." },
      { stage: "Harvesting", day: 70, details: "Pick ripe tomatoes." },
    ],
    Potato: [
      { stage: "Planting", day: 1, details: "Use healthy potato tubers." },
      { stage: "Watering", day: 8, details: "Irrigate after sprouting." },
      { stage: "Fertilizing", day: 20, details: "Apply phosphorus fertilizer." },
      { stage: "Pest Control", day: 40, details: "Use pesticides for blight." },
      { stage: "Harvesting", day: 90, details: "Harvest mature tubers." },
    ],
    Onion: [
      { stage: "Planting", day: 1, details: "Use well-drained soil." },
      { stage: "Watering", day: 10, details: "Water twice a week." },
      { stage: "Fertilizing", day: 30, details: "Use nitrogen-rich fertilizer." },
      { stage: "Pest Control", day: 50, details: "Use insecticides for thrips." },
      { stage: "Harvesting", day: 100, details: "Harvest when tops dry out." },
    ],
    Carrot: [
      { stage: "Sowing", day: 1, details: "Sow seeds 1 cm deep." },
      { stage: "Watering", day: 7, details: "Keep soil moist." },
      { stage: "Fertilizing", day: 20, details: "Use potassium fertilizer." },
      { stage: "Thinning", day: 30, details: "Thin seedlings to 5 cm apart." },
      { stage: "Harvesting", day: 75, details: "Harvest fully grown carrots." },
    ],
    Cabbage: [{ stage: "Sowing", day: 1, details: "Plant in cool season." }, { stage: "Harvesting", day: 80, details: "Harvest when firm." }],
    Cauliflower: [{ stage: "Sowing", day: 1, details: "Sow in well-drained soil." }, { stage: "Harvesting", day: 90, details: "Cut before curd loosens." }],
    Chili: [{ stage: "Sowing", day: 1, details: "Sow in nursery." }, { stage: "Harvesting", day: 120, details: "Pick red chilies." }],
    Garlic: [{ stage: "Planting", day: 1, details: "Plant cloves." }, { stage: "Harvesting", day: 100, details: "Harvest when leaves dry." }],
    Peas: [{ stage: "Sowing", day: 1, details: "Sow in winter." }, { stage: "Harvesting", day: 60, details: "Pick green pods." }],
    Spinach: [{ stage: "Sowing", day: 1, details: "Sow in rows." }, { stage: "Harvesting", day: 45, details: "Pick leaves frequently." }],
    Grapes: [{ stage: "Planting", day: 1, details: "Grow from cuttings." }, { stage: "Harvesting", day: 365, details: "Pick ripe grapes." }],
    Mango: [{ stage: "Planting", day: 1, details: "Plant saplings." }, { stage: "Harvesting", day: 730, details: "Harvest mature mangoes." }],
    Banana: [{ stage: "Planting", day: 1, details: "Use suckers." }, { stage: "Harvesting", day: 365, details: "Cut full bunch." }],
    Watermelon: [{ stage: "Sowing", day: 1, details: "Plant in sandy soil." }, { stage: "Harvesting", day: 90, details: "Harvest when dull-sounding." }],
  };
  

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedDate && formData.cropType && formData.stage) {
      generateAndStoreOperations();
    }
  }, [selectedDate, formData.cropType, formData.stage]);
  const logoutUser = () => {
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${userId}`);
      const data = await response.json();
      setPastEvents(data.pastEvents || []);
      setFutureEvents(data.futureEvents || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setUpcomingOperations([]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateAndStoreOperations = async () => {
    if (!selectedDate || !formData.cropType || !formData.stage) return;

    const operationDetails = croptimeline[formData.cropType].find(
      (op) => op.stage === formData.stage
    );

    if (!operationDetails) return;

    const upcoming = [{
      date: addDays(selectedDate, operationDetails.day),
      operation: operationDetails.details,
    }];

    setUpcomingOperations(upcoming);

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          events: upcoming.map((op) => ({
            date: op.date,
            operation: op.operation,
          })),
        }),
      });

      if (response.ok) {
        fetchEvents();
      } else {
        console.error("Failed to add events");
      }
    } catch (error) {
      console.error("Error adding events:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-hidden shadow-md">
      <div className="layout-container flex h-full flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-50 flex items-center justify-between w-full px-8 py-3 text-sm bg-gradient-to-r from-purple-300 to-green-300 shadow-md">
          {/* Left Side: Logo + Title */}
          <div className="flex items-center gap-3 text-[#1C160C]">
            <div className="size-5">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#1C160C] text-lg font-bold tracking-tight">
              <a href="/home">Millets</a>
            </h2>
          </div>
  
          <nav className="hidden md:flex items-center gap-6 text-xs text-[#1C160C] ml-auto">
            <a href="/home">Chatbot</a>
            <a href="/news">News</a>
            <a href="/shared">Shared Machineries</a>
            <a href="/collab">Collaborative Farming</a>
            <a href="/help" className="mr-6">Help & Support</a>
          </nav>
  
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
              <a href="/tracker" className="flex items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="Finance Icon" className="size-5" />
              </a>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Finance Tracker
              </div>
            </div>
            <ProfileDropdown logoutUser={logoutUser} />
          </div>
        </header>
  
        <div className="flex p-8 bg-gradient-to-br from-green-100 to-yellow-100 min-h-screen">
          <div className="flex-1 pr-6">
            <h2 className="text-3xl font-bold text-left mb-8 text-green-700">Crop Planner</h2>
            <Calendar
              onClickDay={handleDateClick}
              className="rounded-lg shadow-lg border-2 border-green-300 w-full"
              tileContent={({ date }) => {
                const pastEvent = pastEvents.find(e => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"));
                const futureEvent = futureEvents.find(e => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"));
  
                return pastEvent ? (
                  <p className="text-green-700 text-xs bg-green-200 p-1 rounded-md">{pastEvent.operation}</p>
                ) : futureEvent ? (
                  <p className="text-blue-600 text-xs bg-blue-100 p-1 rounded-md">{futureEvent.operation}</p>
                ) : null;
              }}
            />
          </div>
  
          {selectedDate && (
            <div className="flex-1 pl-6">
              <div className="bg-white p-6 rounded-xl shadow-2xl border-2 border-green-200 mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-green-600">Operations for {format(selectedDate, "dd MMM")}</h3>
                <label className="block font-medium text-green-700">Select Crop:</label>
                <select name="cropType" value={formData.cropType} onChange={handleInputChange} className="p-3 border rounded-md w-full border-green-300 text-green-700">
                  <option value="">Select Crop</option>
                  {Object.keys(croptimeline).map(crop => <option key={crop} value={crop}>{crop}</option>)}
                </select>
                <label className="block font-medium text-green-700 mt-4">Select Stage:</label>
                <select name="stage" value={formData.stage} onChange={handleInputChange} className="p-3 border rounded-md w-full border-green-300 text-green-700">
                  <option value="">Select Stage</option>
                  {formData.cropType && croptimeline[formData.cropType].map(item => (
                    <option key={item.stage} value={item.stage}>{item.stage}</option>
                  ))}
                </select>
              </div>
              
              {upcomingOperations.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-2xl border-2 border-green-200 mb-8">
                  <h3 className="text-2xl font-semibold mb-6 text-green-600">Upcoming Operations</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="border p-3 text-green-700">Date</th>
                        <th className="border p-3 text-green-700">Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingOperations.map((op, index) => (
                        <tr key={index} className="border-b border-green-200">
                          <td className="border p-3 text-green-800">{format(op.date, "dd MMM")}</td>
                          <td className="border p-3 text-green-800">{op.operation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}  

export default CropPlanner;