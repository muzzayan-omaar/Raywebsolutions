import { useState, useEffect } from "react";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const POSTS_PER_PAGE = 3;

const Projects = () => {
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  const API_URL = "https://rayweb-backend.onrender.com/api/admin/posts";

  // Format date for display
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setAllPosts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Update current posts when page or allPosts change
  useEffect(() => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const newPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    setCurrentPosts(newPosts);
    if (newPosts.length > 0) setSelectedPost(newPosts[0]);
  }, [page, allPosts]);

  const handlePageChange = (newPage) => setPage(newPage);

  if (!selectedPost) return <p className="text-white p-6">Loading...</p>;

  return (
    <section className="py-16 px-6 md:px-20 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* FEATURED POST */}
        <motion.div
          key={selectedPost._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 order-1 lg:order-1 backdrop-blur-md bg-white/5 rounded-xl shadow-lg border border-white/10 p-6"
        >
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold text-white mb-2">
            {selectedPost.title}
          </h2>
          <p className="text-gray-400 flex items-center gap-2 text-sm mb-4">
            <FaCalendarAlt /> {formatDate(selectedPost.date)}
          </p>
          <p className="text-gray-300 mb-4">{selectedPost.description}</p>
          <p className="text-gray-400 italic mb-4">{selectedPost.extra}</p>
          <a
            href={selectedPost.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            View more <FaExternalLinkAlt />
          </a>
        </motion.div>

        {/* SIDEBAR POSTS */}
        <div className="order-2 lg:order-2">
          {currentPosts.map((post) => (
            <motion.div
              key={post._id}
              whileHover={{ scale: 1.02 }}
              className={`mb-4 p-4 rounded-lg bg-white/5 backdrop-blur-md shadow-lg border border-white/10 cursor-pointer transition
                ${selectedPost._id === post._id ? "border-blue-500 shadow-blue-500/50" : ""}`}
              onClick={() => setSelectedPost(post)}
            >
              <h3 className="text-lg font-medium text-white">{post.title}</h3>
              <p className="text-gray-400 flex items-center gap-2 text-sm mt-2">
                <FaCalendarAlt /> {formatDate(post.date)}
              </p>
            </motion.div>
          ))}

          {/* PAGINATION */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => handlePageChange(Math.min(page + 1, Math.ceil(allPosts.length / POSTS_PER_PAGE)))}
              disabled={page === Math.ceil(allPosts.length / POSTS_PER_PAGE)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
