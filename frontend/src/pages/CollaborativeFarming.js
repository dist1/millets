import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import Header from "../components/Header";

const CollaborativeFarming = () => {
  const navigate = useNavigate();

  const dummyDiscussions = [
    {
      _id: "1",
      title: "Best Practices for Kharif Crops in Maharashtra",
      content: "Let's discuss the most effective techniques for cultivating rice and cotton during the Kharif season in our region.",
    },
  ];

  const dummyProjects = [
    {
      _id: "101",
      name: "Community Farm in Punjab - Wheat Cultivation",
      details: "Join our community project focused on sustainable wheat cultivation in Punjab. We aim to implement modern farming technologies and share profits among members.",
    },
  ];

  const dummySuccessStories = [
    {
      _id: "201",
      title: "Village Transformation through Drip Irrigation in Gujarat",
      content: "A small village in Kutch, Gujarat, increased their yield by 300% after adopting drip irrigation. This initiative not only improved their income but also conserved water significantly.",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      _id: "202",
      title: "Women Empowerment through Organic Farming in Uttarakhand",
      content: "A self-help group of women in the hills of Uttarakhand successfully transitioned to organic farming, leading to better market access and financial independence.",
      imageUrl: "https://via.placeholder.com/300",
    },
    {
      _id: "203",
      title: "Youth-Led Hydroponics Project in Bangalore's Urban Farms",
      content: "Young farmers in Bangalore have started a hydroponics project, growing vegetables in urban spaces. Their innovative approach has reduced water usage and increased productivity.",
      imageUrl: "https://via.placeholder.com/300",
    },
  ];

  const dummyResources = [
    {
      _id: "301",
      title: "Guide to Soil Health Management in India",
      details: "A comprehensive guide on maintaining and improving soil health, tailored for Indian agricultural practices.",
      fileUrl: "https://example.com/soil_health_guide.pdf",
    },
    {
      _id: "302",
      title: "Webinar: Latest Agricultural Technologies for Indian Farmers",
      details: "Watch our webinar on the latest technologies, including precision farming and IoT, that can benefit Indian farmers.",
      videoUrl: "https://example.com/webinar_video",
    },
    {
      _id: "303",
      title: "Indian Government Agricultural Schemes - A Handbook",
      details: "A handbook detailing the various agricultural schemes and subsidies offered by the Indian government.",
      fileUrl: "https://example.com/agri_schemes_handbook.pdf",
    },
  ];

  const logoutUser = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-hidden shadow-md" style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}>
      <Header activePage="Collab" logoutUser={logoutUser} />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center mt-12">
          Collaborative Farming - India
        </h1>

        {/* Discussion Forum */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Discussion Forum</h2>
          {dummyDiscussions.map((discussion) => (
            <div key={discussion._id} className="border p-4 mt-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-green-600 mb-2">{discussion.title}</h3>
              <p className="text-gray-700">{discussion.content}</p>
            </div>
          ))}
        </div>

        {/* Project Collaboration */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Collaboration</h2>
          {dummyProjects.map((project) => (
            <div key={project._id} className="border p-4 mt-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-blue-600 mb-2">{project.name}</h3>
              <p className="text-gray-700 mb-4">{project.details}</p>
              <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full">Join Project</button>
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
            <div key={resource._id} className="border p-4 mt-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-indigo-600 mb-2">{resource.title}</h3>
              <p className="text-gray-700 mb-2">{resource.details}</p>
              {resource.fileUrl && (
                <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">Download PDF</a>
              )}
              {resource.videoUrl && (
                <a href={resource.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">Watch Video</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeFarming;