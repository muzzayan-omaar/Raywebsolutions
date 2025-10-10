import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // currently editing
  const [newPost, setNewPost] = useState({
    title: "",
    image: "",
    description: "",
    link: "",
    extra: "",
  });

  const API_URL = "https://rayweb-backend.onrender.com/api/admin/posts";

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form changes
  const handleChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit && editingPost) {
      setEditingPost({ ...editingPost, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  // Create post
  const handleCreate = async () => {
    if (!newPost.title || !newPost.description) {
      return toast.error("Title and Description are required");
    }

    try {
      const res = await axios.post(API_URL, newPost);
      setPosts([res.data, ...posts]);
      setNewPost({
        title: "",
        image: "",
        description: "",
        link: "",
        extra: "",
      });
      toast.success("Post created");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
    }
  };

  // Update post
  const handleUpdate = async (id) => {
    try {
      const { date, ...payload } = editingPost; // ignore date
      const res = await axios.put(`${API_URL}/${id}`, payload);
      setPosts(posts.map((p) => (p._id === id ? res.data : p)));
      setEditingPost(null);
      toast.success("Post updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post");
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  // Format date for display
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Posts</h2>

      {/* CREATE POST */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md"
      >
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <FaPlus /> Create New Post
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleChange}
            className="p-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newPost.image}
            onChange={handleChange}
            className="p-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="link"
            placeholder="External Link"
            value={newPost.link}
            onChange={handleChange}
            className="p-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newPost.description}
            onChange={handleChange}
            className="p-2 rounded col-span-2 bg-white/10 border border-white/20 text-white placeholder-gray-400"
          />
          <textarea
            name="extra"
            placeholder="Extra info"
            value={newPost.extra}
            onChange={handleChange}
            className="p-2 rounded col-span-2 bg-white/10 border border-white/20 text-white placeholder-gray-400"
          />
        </div>
        <button
          onClick={handleCreate}
          className="mt-3 bg-primary text-black py-2 px-4 rounded hover:bg-sky-400 transition"
        >
          Create Post
        </button>
      </motion.div>

      {/* POSTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md"
            >
              {editingPost && editingPost._id === post._id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editingPost.title}
                    onChange={(e) => handleChange(e, true)}
                    className="p-2 rounded mb-2 bg-white/10 border border-white/20 text-white w-full"
                  />
                  <input
                    type="text"
                    name="image"
                    value={editingPost.image}
                    onChange={(e) => handleChange(e, true)}
                    className="p-2 rounded mb-2 bg-white/10 border border-white/20 text-white w-full"
                  />
                  <input
                    type="text"
                    name="link"
                    value={editingPost.link}
                    onChange={(e) => handleChange(e, true)}
                    className="p-2 rounded mb-2 bg-white/10 border border-white/20 text-white w-full"
                  />
                  <textarea
                    name="description"
                    value={editingPost.description}
                    onChange={(e) => handleChange(e, true)}
                    className="p-2 rounded mb-2 bg-white/10 border border-white/20 text-white w-full"
                  />
                  <textarea
                    name="extra"
                    value={editingPost.extra}
                    onChange={(e) => handleChange(e, true)}
                    className="p-2 rounded mb-2 bg-white/10 border border-white/20 text-white w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleUpdate(post._id)}
                      className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={() => setEditingPost(null)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{formatDate(post.date)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default AdminPosts;
