import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { ExternalLink, X, Trash2 } from "lucide-react";

const ExpandedBookmarkCard = ({ bookmark, onClose, onDelete }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const res = await fetch(
        `https://brainly-cj6c.vercel.app/api/bookmarks/${bookmark._id}`,
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
        onClose();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 dark:from-white/10 dark:via-white/5 dark:to-white/10 p-[1px]">
          <div className="h-full w-full rounded-3xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-2xl"></div>
        </div>

        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-white/10">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {bookmark.favicon ? (
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/50 dark:bg-black/30 backdrop-blur-sm p-2 flex-shrink-0">
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-azure-400/60 to-azure-600/60 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                  {bookmark.title || "Untitled"}
                </h2>
                <p className="text-sm text-slate-600 dark:text-gray-300 mt-1 break-all">
                  {bookmark.url}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
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
                onClick={onClose}
                className="w-10 h-10 bg-gray-200/50 hover:bg-gray-300/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <X className="w-5 h-5 text-slate-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-6 py-6">
              <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-gray-100">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium mb-2 text-slate-700 dark:text-gray-200">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-slate-700 dark:text-gray-300 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 space-y-1 text-slate-700 dark:text-gray-300">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 space-y-1 text-slate-700 dark:text-gray-300">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-azure-500/50 pl-4 my-4 italic text-slate-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 py-2 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-200/70 dark:bg-gray-800/70 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-gray-200">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {bookmark.summary?.trim()
                    ? bookmark.summary
                    : "_No summary available for this link._"}
                </ReactMarkdown>
              </div>

              {/* Add some bottom padding for better scrolling */}
              <div className="h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedBookmarkCard;
