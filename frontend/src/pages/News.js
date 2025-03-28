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
    <div className="container mx-auto p-6">
      {/* Include Header */}
      <Header activePage="News" logoutUser={() => {}} /> {/* Pass activePage as 'News' */}
<div className="fade-content">
      <h1 className="text-3xl font-bold text-center mb-6 mt-24">Agricultural Resources Hub</h1>

      {/* Tab Buttons */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-6 py-2 border border-gray-400 rounded-l-md ${
            view === "schemes" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => setView("schemes")}
        >
          Government Schemes
        </button>
        <button
          className={`px-6 py-2 border border-gray-400 rounded-r-md ${
            view === "news" ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => {
            setView("news");
            fetchNews();
          }}
        >
          Agriculture News
        </button>
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
    </div>
  );
};

export default News;