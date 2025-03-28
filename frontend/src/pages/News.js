import React, { useState, useEffect } from "react";
import Header from "../components/Header"; // Import Header Component

const News = () => {
  const [search, setSearch] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("schemes"); // 'schemes' or 'news'

  useEffect(() => {
    if (view === "schemes") {
      fetchSchemes();
    }
  }, [view]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/schemes.json"); // Adjust path if necessary
      if (!response.ok) throw new Error("Failed to fetch schemes");
      const data = await response.json();
      setSchemes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=agriculture+India&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setNews(data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-hidden shadow-md"
      style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Navbar */}
        <Header activePage="News" logoutUser={logoutUser} />

        {/* Main Content - Added pt-[100px] to create space below the header */}
        <div className="flex flex-col px-32 py-10 text-center fade-content pt-[100px]">
          <h1 className="text-[#1C160C] text-2xl font-bold pb-4">
            Smart Farming-related News
          </h1>
          <p className="text-[#4A4A4A] text-lg pb-6">
            Stay updated with the latest developments in agriculture, market trends, government policies, and innovations in farming.
          </p>

          {/* News Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-[#1C160C]">
                Agriculture Market Updates
              </h3>
              <p className="text-sm text-[#4A4A4A] mt-2">
                Latest insights on crop prices, supply-demand trends, and government policies.
              </p>
            </div>

            <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-[#1C160C]">
                Innovations in Smart Farming
              </h3>
              <p className="text-sm text-[#4A4A4A] mt-2">
                Explore the latest technological advancements in precision farming and AI-powered tools.
              </p>
            </div>

            <div className="bg-[#F6F3EE] p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-[#1C160C]">
                Weather & Climate Reports
              </h3>
              <p className="text-sm text-[#4A4A4A] mt-2">
                Get accurate forecasts and climate-related updates to plan farming activities better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Box (Only for Schemes) */}
      {view === "schemes" && (
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search schemes..."
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Display Data */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : view === "schemes" ? (
        // Government Schemes Section
        <div className="grid md:grid-cols-3 gap-6">
          {schemes.length > 0 ? (
            schemes
              .filter((scheme) => scheme.name.toLowerCase().includes(search.toLowerCase()))
              .map((scheme) => (
                <div key={scheme.id} className="border p-4 rounded-md shadow-md">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold">{scheme.name}</h2>
                    <span className="px-2 py-1 border rounded-full text-sm">{scheme.tag}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{scheme.description}</p>
                  <h3 className="mt-3 font-semibold">Eligibility:</h3>
                  <p className="text-gray-700">{scheme.eligibility}</p>
                  <h3 className="mt-3 font-semibold">Benefits:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <button
                    className="mt-4 w-full bg-black text-white py-2 rounded-md"
                    onClick={() => window.open(scheme.link, "_blank")}
                  >
                    Apply Now
                  </button>
                </div>
              ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No matching schemes found.</p>
          )}
        </div>
      ) : (
        // Agriculture News Section
        <div className="grid md:grid-cols-3 gap-6">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="border p-4 rounded-md shadow-md">
                {article.urlToImage && (
                  <img src={article.urlToImage} alt="News" className="w-full h-40 object-cover mb-3 rounded-md" />
                )}
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p className="text-gray-600 mt-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Read More
                </a>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No agriculture news found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default News;