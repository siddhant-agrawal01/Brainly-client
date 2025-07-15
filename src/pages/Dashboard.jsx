import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";
import BookmarkCard from "../components/BookmarkCard";
import Header from "../components/Header";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookmarks = useCallback(async () => {
    try {
      const res = await axios.get("/bookmarks");
      setBookmarks(res.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      const res = await axios.post("/bookmarks", { url });
      setBookmarks([res.data, ...bookmarks]);
      setUrl("");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save bookmark");
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchBookmarks();
    }
  }, [fetchBookmarks]);

  return (
    <div className="min-h-screen bg-pearl-50 dark:bg-obsidian-950 gradient-mesh-light dark:gradient-mesh-dark transition-all duration-500">
      <Header />

      <main className="max-w-7xl mx-auto mt-10 px-6 sm:px-8 lg:px-12 py-8">
        <div className="bg-pearl-50/40  dark:bg-obsidian-900/20 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-black/30 border border-pearl-200/60 dark:border-obsidian-700/60 p-10 mb-10 slide-in-up">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-azure-600 to-azure-700 dark:from-azure-400 dark:to-azure-300 bg-clip-text text-transparent mb-8">
            Add New Bookmark
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-5">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a URL to save..."
              className="flex-1 px-6 py-4 border-0 bg-pearl-100/90 dark:bg-obsidian-800/90 backdrop-blur-sm rounded-2xl focus-professional text-slate-900 dark:text-pearl-100 placeholder-slate-500 dark:placeholder-obsidian-300 shadow-lg transition-all duration-300"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`relative bg-gradient-to-r from-azure-500 to-azure-600 hover:from-azure-600 hover:to-azure-700 text-pearl-50 px-10 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
                isLoading
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:shadow-xl hover:shadow-azure-500/25 hover:scale-105"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-pearl-50/30 border-t-pearl-50 rounded-full"></div>
                  <span className="animate-pulse">Saving...</span>
                </div>
              ) : (
                "Save Bookmark"
              )}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {bookmarks.map((bookmark, index) => (
            <div
              key={bookmark._id}
              className="slide-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <BookmarkCard bookmark={bookmark} onDelete={handleDelete} />
            </div>
          ))}
        </div>

        {bookmarks.length === 0 && (
          <div className="text-center py-20 slide-in-up">
            <div className="text-9xl mb-8 opacity-40">📚</div>
            <h3 className="text-3xl font-bold text-slate-700 dark:text-pearl-200 mb-4">
              No bookmarks yet
            </h3>
            <p className="text-slate-600 dark:text-obsidian-300 text-xl">
              Save your first URL above to get started! ✨
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
