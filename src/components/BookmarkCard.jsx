import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { ExternalLink, X, Trash2, ChevronRight } from "lucide-react";

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

  const openUrl = (e) => {
    e.stopPropagation();
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  const CompactCard = () => (
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
  );

  const ExpandedCard = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray/60 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 dark:from-white/10 dark:via-white/5 dark:to-white/10 p-[1px]">
          <div className="h-full w-full rounded-3xl bg-white/80 dark:bg-zinc-950/70 backdrop-blur-2xl"></div>
        </div>

        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-white/10">
            <div className="flex items-center gap-4">
              {bookmark.favicon ? (
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/30 dark:bg-black/30 backdrop-blur-sm p-2">
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-azure-400/60 to-azure-600/60 backdrop-blur-sm flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-slate-900/90 dark:text-white/90 line-clamp-2">
                  {bookmark.title || "Untitled"}
                </h2>
                <p className="text-sm text-slate-600/80 dark:text-white/60 mt-1">
                  {bookmark.url}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openUrl}
                className="flex items-center gap-2 bg-azure-500/20 hover:bg-azure-500/30 backdrop-blur-sm text-azure-700 dark:text-azure-300 font-semibold px-4 py-2 rounded-xl border border-azure-500/30 transition-all duration-200 hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Open</span>
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-red-700 dark:text-red-300 font-semibold px-4 py-2 rounded-xl border border-red-500/30 transition-all duration-200 hover:scale-105"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>

              <button
                onClick={() => setIsExpanded(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <X className="w-5 h-5 text-slate-700 dark:text-white/70" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {bookmark.summary?.trim()
                  ? bookmark.summary
                  : "_No summary available for this link._"}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <CompactCard />
      {isExpanded && <ExpandedCard />}
    </>
  );
};

export default BookmarkCard;
