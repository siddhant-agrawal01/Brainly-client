// const BookmarkCard = ({ bookmark, onDelete }) => {
//     const { _id, url, title, favicon, summary } = bookmark;
  
//     return (
//       <div className="bg-white rounded shadow p-4">
//         <div className="flex items-center gap-2 mb-2">
//           <img src={favicon} alt="icon" className="w-5 h-5" />
//           <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 underline break-all">
//             {title || url}
//           </a>
//         </div>
//         <p className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</p>
//         <button
//           onClick={() => onDelete(_id)}
//           className="mt-2 text-red-500 text-sm hover:underline"
//         >
//           Delete
//         </button>
//       </div>
//     );
//   };
  
//   export default BookmarkCard;
  // src/components/BookmarkCard.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

const BookmarkCard = ({ bookmark, onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookmarks/${bookmark._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.ok) {
        toast.success('Bookmark deleted');
        onDelete(bookmark._id);
      } else {
        toast.error('Failed to delete');
      }
    } catch (err) {
      toast.error('Error deleting');
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img
            src={bookmark.favicon || '/favicon.ico'}
            alt="favicon"
            className="w-6 h-6"
          />
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            {bookmark.title}
          </a>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>

      <div className="prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {bookmark.summary || '*No summary available.*'}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BookmarkCard;
