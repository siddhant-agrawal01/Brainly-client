const BookmarkCard = ({ bookmark, onDelete }) => {
    const { _id, url, title, favicon, summary } = bookmark;
  
    return (
      <div className="bg-white rounded shadow p-4">
        <div className="flex items-center gap-2 mb-2">
          <img src={favicon} alt="icon" className="w-5 h-5" />
          <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 underline break-all">
            {title || url}
          </a>
        </div>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</p>
        <button
          onClick={() => onDelete(_id)}
          className="mt-2 text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    );
  };
  
  export default BookmarkCard;
  