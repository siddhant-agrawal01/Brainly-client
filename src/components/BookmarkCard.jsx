import React, { useState } from "react";
import { toast } from "sonner";
import { ExternalLink, X, ChevronRight } from "lucide-react";
import ExpandedBookmarkCard from "./ExpandedBookmarkCard";

const BookmarkCard = ({ bookmark, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
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
      console.log(res);
      if (res.ok) {
        toast.success("Bookmark deleted");
        onDelete(bookmark._id);
      } else {
        toast.error("Failed to delete bookmark.");
      }
    } catch {
      toast.error("An error occurred while deleting.");
    }
  };

  return (
    <>
      <div
        onClick={() => setIsExpanded(true)}
        className="group relative h-32 w-full bg-white/70 dark:bg-black/20 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/30 dark:hover:bg-black/30 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-black/5 dark:from-white/5 dark:to-black/10 pointer-events-none"></div>

        <div className="relative h-full flex flex-col justify-between">
          <div className="flex items-start gap-3">
            {bookmark.favicon ? (
              <div className="flex-shrink-0 w-8 h-8 rounded-xl overflow-hidden bg-white/30 dark:bg-black/30 backdrop-blur-sm p-1.5">
                <img
                  src={bookmark.favicon}
                  alt="favicon"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-azure-400/60 to-azure-600/60 backdrop-blur-sm flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-slate-900/90 dark:text-white/90 line-clamp-2 leading-tight mb-1">
                {bookmark.title || "Untitled"}
              </h3>
              <p className="text-xs text-slate-600/80 dark:text-white/60 line-clamp-1">
                {new URL(bookmark.url).hostname}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500/80 dark:text-white/50 font-medium">
              Tap to read
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400/80 dark:text-white/40 group-hover:text-azure-500 dark:group-hover:text-azure-400 transition-colors" />
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 hover:bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <X className="w-3 h-3 text-white" />
        </button>
      </div>

      {isExpanded && (
        <ExpandedBookmarkCard
          bookmark={bookmark}
          onClose={() => setIsExpanded(false)}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default BookmarkCard;
