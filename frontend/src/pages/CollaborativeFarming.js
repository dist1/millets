import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";

import Header from "../components/Header"; // Import Header Component

const CollaborativeFarming = () => {
  const navigate = useNavigate();
  const handleJoinProject = () => {
    alert("You will be contacted soon by the community.");
  };
  const [labourRequests, setLabourRequests] = useState([
    {
      id: 1,
      name: "Ajay Deshmukh",
      contact: "9876543210",
      location: "Mulshi, Pune",
      date: "2025-03-30",
      laboursNeeded: 3,
    },
    {
      id: 2,
      name: "Ganpat Patil",
      contact: "9822334455",
      location: "Somatane, Pune",
      date: "2025-04-01",
      laboursNeeded: 4,
    },
    {
      id: 3,
      name: "Raju Shinde",
      contact: "9933221100",
      location: "Velhe, Pune",
      date: "2025-04-02",
      laboursNeeded: 2,
    },
  ]);
  const [selectedTime, setSelectedTime] = useState({});
  const [showHireForm, setShowHireForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    name: "",
    contact: "",
    location: "",
    date: "",
    laboursNeeded: 1,
  });

  const dummyDiscussions = [
    {
      _id: "1",
      title: "Best Practices for Kharif Crops in Maharashtra",
      content:
        "Let's discuss the most effective techniques for cultivating rice and cotton during the Kharif season in our region.",
    },
  ];

  const dummyProjects = [
    {
      _id: "101",
      name: "Community Farm in Punjab - Wheat Cultivation",
      details:
        "Join our community project focused on sustainable wheat cultivation in Punjab. We aim to implement modern farming technologies and share profits among members.",
    },
  ];

  const dummySuccessStories = [
    {
      _id: "201",
      title: "Village Transformation through Drip Irrigation in Gujarat",
      content:
        "A small village in Kutch, Gujarat, increased their yield by 300% after adopting drip irrigation. This initiative not only improved their income but also conserved water significantly.",
      imageUrl: "https://tse1.mm.bing.net/th?id=OIP.O9fPR69stbjCkDzHCMBpgAAAAA&pid=Api&P=0&h=180", // Corrected URL
    },
    {
      _id: "202",
      title: "Women Empowerment through Organic Farming in Uttarakhand",
      content:
        "A self-help group of women in the hills of Uttarakhand successfully transitioned to organic farming, leading to better market access and financial independence.",
      imageUrl: "https://tse2.mm.bing.net/th?id=OIP.vx8870drJTrDyfz4d6IO3gHaEi&pid=Api&P=0&h=180", // Corrected URL
    },
    {
      _id: "203",
      title: "Youth-Led Hydroponics Project in Bangalore's Urban Farms",
      content:
        "Young farmers in Bangalore have started a hydroponics project, growing vegetables in urban spaces. Their innovative approach has reduced water usage and increased productivity.",
      imageUrl: "https://tse2.mm.bing.net/th?id=OIP.c2kwn4mls22OFXMlAue59gHaE8&pid=Api&P=0&h=180", // Corrected URL
    },
  ];

  const dummyResources = [
    {
      _id: "301",
      title: "Guide to Soil Health Management in India",
      details:
        "A comprehensive guide on maintaining and improving soil health, tailored for Indian agricultural practices.",
      fileUrl: "https://example.com/soil_health_guide.pdf",
    },
    {
      _id: "302",
      title: "Webinar: Latest Agricultural Technologies for Indian Farmers",
      details:
        "Watch our webinar on the latest technologies, including precision farming and IoT, that can benefit Indian farmers.",
      videoUrl: "https://example.com/webinar_video",
    },
    {
      _id: "303",
      title: "Indian Government Agricultural Schemes - A Handbook",
      details:
        "A handbook detailing the various agricultural schemes and subsidies offered by the Indian government.",
      fileUrl: "https://example.com/agri_schemes_handbook.pdf",
    },
  ];

  const handleAssignWork = (id, date, location) => {
    if (!selectedTime[id]) {
      alert("Please select a time before assigning work!");
      return;
    }

    setLabourRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id && request.laboursNeeded > 0
          ? { ...request, laboursNeeded: request.laboursNeeded - 1 }
          : request
      )
    );
    alert(`Work assigned at ${selectedTime[id]} on ${date}: ${location}`);
  };

  const logoutUser = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleHireLabour = () => {
    setShowHireForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLabourRequests([
      ...labourRequests,
      {
        ...newRequest,
        id: Date.now(),
      },
    ]);
    setShowHireForm(false);
    setNewRequest({ name: "", contact: "", location: "", date: "", laboursNeeded: 1 });
  };

  return (

    <div
      className="relative flex min-h-screen flex-col bg-white overflow-hidden rounded-lg shadow-md"
      style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}
    >
    {/* Include Header */}
    <Header activePage="Collab" logoutUser={() => {}} /> {/* Pass activePage as 'News' */}
      <div className="p-8 bg-gray-100 min-h-screen pt-20">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Collaborative Farming - India
        </h1>

        {showHireForm && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-6 rounded-lg shadow-md mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hire Labour Form
            </h2>
            <input
              type="text"
              placeholder="Farm Name"
              value={newRequest.name}
              onChange={(e) => setNewRequest({ ...newRequest, name: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              placeholder="Contact"
              value={newRequest.contact}
              onChange={(e) => setNewRequest({ ...newRequest, contact: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newRequest.location}
              onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <input
              type="date"
              value={newRequest.date}
              onChange={(e) => setNewRequest({ ...newRequest, date: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <input
              type="number"
              placeholder="Labours Needed"
              value={newRequest.laboursNeeded}
              onChange={(e) => setNewRequest({ ...newRequest, laboursNeeded: parseInt(e.target.value) })}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Publish Request
            </button>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Labour Requests
          </h2>
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleHireLabour}
        >
          Want to Hire Labour?
        </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {labourRequests.map((request) => (
              <div
                key={request.id}
                className="border p-4 rounded-lg shadow-sm flex flex-col"
              >
                <h3 className="font-semibold text-lg text-yellow-600">
                  {request.name}
                </h3>
                <p className="text-gray-700">📞 {request.contact}</p>
                <p className="text-gray-700">📍 {request.location}</p>
                <p className="text-gray-700">📅 {request.date}</p>
                <p className="text-gray-700">
                  👥 Labours Needed: {request.laboursNeeded}
                </p>

                <div className="mt-2">
                  <label className="text-gray-700">⏰ Select Time:</label>
                  <input
                    type="time"
                    className="border p-2 rounded w-full md:w-auto"
                    onChange={(e) =>
                      setSelectedTime({
                        ...selectedTime,
                        [request.id]: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() =>
                    handleAssignWork(request.id, request.date, request.location)
                  }
                  disabled={request.laboursNeeded === 0}
                >
                  Work Here
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Success Stories
          </h2>
          {dummySuccessStories.map((story) => (
            <div
              key={story._id}
              className="border p-4 mt-4 rounded-lg shadow-sm flex"
            >
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-1/3 mr-4 rounded-lg"
              />
              <div className="w-2/3">
                <h3 className="font-semibold text-lg text-yellow-600 mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-700">{story.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Discussion Forum</h2>
          {dummyDiscussions.map((discussion) => (

            <div
              key={discussion._id}
              className="border p-4 mt-4 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-lg text-green-600 mb-2">
                {discussion.title}
              </h3>

              <p className="text-gray-700">{discussion.content}</p>
            </div>
          ))}
        </div>

        {/* Project Collaboration */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Collaboration</h2>
          {dummyProjects.map((project) => (

            <div
              key={project._id}
              className="border p-4 mt-4 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-lg text-blue-600 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-700 mb-4">{project.details}</p>
              <button
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                onClick={handleJoinProject} // Add this line
              >
                Join Project
              </button>

            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Success Stories</h2>
          {dummySuccessStories.map((story) => (
            <div key={story._id} className="border p-4 mt-4 rounded-lg shadow-sm flex">
              <img src={story.imageUrl} alt={story.title} className="w-1/3 mr-4 rounded-lg" />
              <div className="w-2/3">
                <h3 className="font-semibold text-lg text-yellow-600 mb-2">{story.title}</h3>
                <p className="text-gray-700">{story.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resources */}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resources</h2>
          {dummyResources.map((resource) => (

            <div
              key={resource._id}
              className="border p-4 mt-4 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-lg text-indigo-600 mb-2">
                {resource.title}
              </h3>

              <p className="text-gray-700 mb-2">{resource.details}</p>
              {resource.fileUrl && (
                <a
                  href={resource.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Download PDF
                </a>
              )}
              {resource.videoUrl && (
                <a
                  href={resource.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Watch Video
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeFarming;