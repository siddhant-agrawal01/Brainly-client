// import { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import BookmarkCard from '../components/BookmarkCard';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [url, setUrl] = useState('');
//   const [bookmarks, setBookmarks] = useState([]);
//   const navigate = useNavigate();

//   const fetchBookmarks = async () => {
//     try {
//       const res = await axios.get('/bookmarks');
//       setBookmarks(res.data);
//     } catch (err) {
//       alert('Error fetching bookmarks. Please log in again.');
//       localStorage.removeItem('token');
//       navigate('/login');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!url.trim()) return;

//     try {
//       const res = await axios.post('/bookmarks', { url });
//       setBookmarks([res.data, ...bookmarks]);
//       setUrl('');
//     } catch (err) {
//       alert(err.response?.data?.error || 'Failed to save bookmark');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/bookmarks/${id}`);
//       setBookmarks(bookmarks.filter((b) => b._id !== id));
//     } catch {
//       alert('Failed to delete bookmark');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   useEffect(() => {
//     fetchBookmarks();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <header className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">📌 My Bookmarks</h1>
//         <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">
//           Logout
//         </button>
//       </header>

//       <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
//         <input
//           type="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter a URL to save"
//           className="flex-1 px-3 py-2 border rounded"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Save
//         </button>
//       </form>

//       <div className="grid gap-4">
//         {bookmarks.map((bookmark) => (
//           <BookmarkCard key={bookmark._id} bookmark={bookmark} onDelete={handleDelete} />
//         ))}
//         {bookmarks.length === 0 && <p>No bookmarks yet. Save one above! 😊</p>}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import BookmarkCard from '../components/BookmarkCard';
import { toast } from 'sonner';

function Dashboard() {
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get('/bookmarks');
      setBookmarks(res.data);
    } catch (err) {
      toast.error('Failed to load bookmarks.');
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return toast.warning('Please enter a URL');

    try {
      setLoading(true);
      const res = await axios.post('/bookmarks', { url });
      setBookmarks([res.data, ...bookmarks]);
      setUrl('');
      toast.success('Bookmark added!');
    } catch (err) {
      toast.error('Error saving bookmark.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded border"
          placeholder="Paste a URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {bookmarks.map((bm) => (
        <BookmarkCard
          key={bm._id}
          data={bm}
          onDelete={() =>
            setBookmarks((prev) => prev.filter((b) => b._id !== bm._id))
          }
        />
      ))}
    </div>
  );
}

export default Dashboard;
