import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";
import BookmarkCard from "../components/BookmarkCard";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await axios.get("/bookmarks");
      setBookmarks(res.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      alert("Error fetching bookmarks. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      const res = await axios.post("/bookmarks", { url });
      setBookmarks([res.data, ...bookmarks]);
      setUrl("");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save bookmark");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/bookmarks/${id}`);
      setBookmarks(bookmarks.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete bookmark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header with Theme Switcher */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                📌 My Bookmarks
              </h1>
            </div>

            <div className="flex items-center space-x-6">
              <ThemeSwitcher />
              <button
                onClick={handleLogout}
                className="text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Bookmark
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a URL to save"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Save
            </button>
          </form>
        </div>

        {/* Bookmarks Grid */}
        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark._id}
              bookmark={bookmark}
              onDelete={handleDelete}
            />
          ))}
          {bookmarks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No bookmarks yet.
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                Save your first URL above! 😊
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
