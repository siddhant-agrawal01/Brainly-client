import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

const BookmarkCard = ({ bookmark, onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookmarks/${bookmark._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        toast.success("Bookmark deleted");
        onDelete(bookmark._id);
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Error deleting");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/30 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={bookmark.favicon || "/favicon.ico"}
            alt="favicon"
            className="w-6 h-6 rounded-sm"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200 line-clamp-1"
          >
            {bookmark.title}
          </a>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 dark:text-red-400 text-sm font-medium hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded-md transition-all duration-200"
        >
          Delete
        </button>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {bookmark.summary || "*No summary available.*"}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BookmarkCard;
