import React, { useState, useEffect } from "react";
import Header from "../components/Header"; // Import Header Component
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div 
            className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-hidden shadow-md"
            style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}
        >
            <div className="layout-container flex h-full grow flex-col">
                {/* Navbar */}
                <Header activePage="Shared" logoutUser={logoutUser} />

                {/* Shared Machineries Section - Updated top padding */}
                <div className="layout-container flex h-full grow flex-col overflow-y-auto fade-content px-32 py-10 text-center pt-[100px]">
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
=======
  const [machineries, setMachineries] = useState([]);
  const [filters, setFilters] = useState({ type: "", availability: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMachinery, setNewMachinery] = useState({
    name: "",
    image: "",

    description: "",
    type: "Tractor",
    availability: "Available",
    rentalPrice: 0,
  });
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  useEffect(() => {
    fetchUserAndMachineries();
  }, []); // Runs only once on mount
  
  useEffect(() => {
    if (user?.state && user?.district) {
      fetchMachineries(user.state, user.district);
    }
  }, [user]); // Runs only when user is updated  

  const fetchUserAndMachineries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to access this page.");
        return;
      }
  
      const userResponse = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const userData = userResponse.data;
      setUser(userData);
  
      // Fetch machineries only if user data is complete
      if (userData?.state && userData?.district) {
        fetchMachineries(userData.state, userData.district);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Authentication failed. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error fetching user or machineries:", err);
    } finally {
      setLoading(false);
    }
  };    

  const fetchMachineries = async (state, district) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/machineries?state=${state}&district=${district}`
      );
      console.log(response.data);
      setMachineries(response.data);
    } catch (error) {
      console.error("Error fetching machineries:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredMachineries = machineries.filter((machine) =>
    (filters.type ? machine.type === filters.type : true) &&
    (filters.availability ? machine.availability === filters.availability : true)
  );

  const handleAddMachinery = () => {
    setShowAddForm(true);
  };

  const handleFormChange = (e) => {
    setNewMachinery({ ...newMachinery, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/machineries", {
        ...newMachinery,
        state: user.state,
        district: user.district,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowAddForm(false);
      fetchMachineries(user.state, user.district); // Refresh listings
      setNewMachinery({
        name: "",
        image: "",
        description: "",
        type: "Tractor",
        availability: "Available",
        rentalPrice: 0,
      });
    } catch (error) {
      console.error("Error posting machinery:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading User data...</div>;
  }

  return (
    <div className="container mx-auto p-6 pt-20">
      {/* Include Header */}
      <Header activePage="Shared" logoutUser={() => {}} /> {/* Pass activePage as 'Shared' */}
      <div className="fade-content">
      <h1 className="text-2xl font-bold">Shared Machineries</h1>

      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleAddMachinery}
      >
        Add Machinery
      </button>

      {/* Add Machinery Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input type="text" name="name" placeholder="Name" value={newMachinery.name} onChange={handleFormChange} className="border p-2 mb-2 w-full" />
          <input type="text" name="image" placeholder="Image URL" value={newMachinery.image} onChange={handleFormChange} className="border p-2 mb-2 w-full" />
          <textarea name="description" placeholder="Description" value={newMachinery.description} onChange={handleFormChange} className="border p-2 mb-2 w-full" />
          <select name="type" value={newMachinery.type} onChange={handleFormChange} className="border p-2 mb-2 w-full">
            <option value="Tractor">Tractor</option>
            <option value="Harvester">Harvester</option>
            <option value="Seeder">Seeder</option>
          </select>
          <select name="availability" value={newMachinery.availability} onChange={handleFormChange} className="border p-2 mb-2 w-full">
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Reserved">Reserved</option>
          </select>
          <input type="number" name="rentalPrice" placeholder="Rental Price" value={newMachinery.rentalPrice} onChange={handleFormChange} className="border p-2 mb-2 w-full" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded ml-2">Cancel</button>
        </form>
      )}

      {/* Filters */}
      <div className="flex gap-4 mt-4">
        <select name="type" onChange={handleFilterChange}>
          <option value="">Select Type</option>
          <option value="Tractor">Tractor</option>
          <option value="Harvester">Harvester</option>
          <option value="Seeder">Seeder</option>
        </select>
        <select name="availability" onChange={handleFilterChange}>
          <option value="">Availability</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Reserved">Reserved</option>
        </select>
      </div>

      {/* Machinery Listings */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {filteredMachineries.map((machine) => (
          <div key={machine._id} className="border p-4 rounded shadow">
            <img
              src={machine.image}
              alt={machine.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-semibold">{machine.name}</h2>
            <p>{machine.description}</p>
            <p className="text-sm text-gray-500">
              Name: "ajay deshmukh"
            </p>
            <p className="text-sm text-gray-500">
              Availability: {machine.availability}
            </p>
            <p className="text-sm text-gray-500">
              State: {machine.location.state}
            </p>
            <p className="text-sm text-gray-500">
              District: {machine.location.district}
            </p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => alert("Request sent to ajay deshmukh successfully")}>
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SharedMachineries;