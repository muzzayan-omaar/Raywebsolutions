import { useState, useEffect } from "react";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const postsData = [
  {
    id: 1,
    title: "Corporate Website for Tech Firm",
    date: "Aug 15, 2024",
    image: "https://res.cloudinary.com/diszilwhc/image/upload/v1752783111/3562984_risfzw.jpg",
    description:
      "We built a sleek, modern website for a corporate tech firm focusing on performance, SEO, and security.",
    link: "https://example.com",
    extra: "Achievements: Improved traffic by 60%, integrated payment system.",
  },
  {
    id: 2,
    title: "Mobile App for Logistics Startup",
    date: "Sep 02, 2024",
    image: "https://res.cloudinary.com/diszilwhc/image/upload/v1752783145/5078803_r8ntve.jpg",
    description:
      "Developed a cross-platform logistics tracking app with real-time GPS, push notifications, and payment integration.",
    link: "https://instagram.com/example",
    extra: "Achievements: Reduced delivery times by 40%.",
  },
  {
    id: 3,
    title: "CCTV Systems Installation",
    date: "Oct 01, 2024",
    image: "https://res.cloudinary.com/diszilwhc/image/upload/v1752783033/3266936_uzgmnq.jpg",
    description:
      "Installed a fully managed CCTV system with cloud backup for a business hub in Kampala.",
    link: "https://instagram.com/example",
    extra: "Achievements: Increased security and reduced theft incidents by 70%.",
  },
  {
    id: 4,
    title: "E-commerce Store for Boutique",
    date: "Nov 10, 2024",
    image: "https://res.cloudinary.com/diszilwhc/image/upload/v1752782987/3134925_zmmnsc.jpg",
    description:
      "A fast and modern online boutique store with integrated payments and delivery tracking.",
    link: "https://example.com",
    extra: "Achievements: Boosted sales by 45% in 2 months.",
  },
  {
    id: 5,
    title: "Networking Solutions Setup",
    date: "Dec 01, 2024",
    image: "https://res.cloudinary.com/diszilwhc/image/upload/v1752783070/3175710_r4wvyn.jpg",
    description:
      "Set up high-performance WiFi and LAN networking for a school with 200+ students.",
    link: "https://instagram.com/example",
    extra: "Achievements: Reliable connectivity across campus.",
  },
];

// Pagination size
const POSTS_PER_PAGE = 3;

const Projects = () => {
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(postsData[0]);

  const totalPages = Math.ceil(postsData.length / POSTS_PER_PAGE);

  // Update current posts when page changes
  useEffect(() => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const newPosts = postsData.slice(startIndex, startIndex + POSTS_PER_PAGE);
    setCurrentPosts(newPosts);
    setSelectedPost(newPosts[0]); // Auto-select first post on the page
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <section className="py-16 px-6 md:px-20 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* FEATURED POST */}
        <motion.div
          key={selectedPost.id}
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
            <FaCalendarAlt /> {selectedPost.date}
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
              key={post.id}
              whileHover={{ scale: 1.02 }}
              className={`mb-4 p-4 rounded-lg bg-white/5 backdrop-blur-md shadow-lg border border-white/10 cursor-pointer transition
                ${selectedPost.id === post.id ? "border-blue-500 shadow-blue-500/50" : ""}`}
              onClick={() => setSelectedPost(post)}
            >
              <h3 className="text-lg font-medium text-white">{post.title}</h3>
              <p className="text-gray-400 flex items-center gap-2 text-sm mt-2">
                <FaCalendarAlt /> {post.date}
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
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
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
