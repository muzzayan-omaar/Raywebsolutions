import { useState } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { FaClipboardList, FaTags, FaEnvelope, FaCommentDots, FaStar, FaHammer } from "react-icons/fa";

import DashboardHome from "./DashboardHome";
import Posts from "./Posts";
import AdminPricing from "./AdminPricing"; // <-- import AdminPricing
import Subscriptions from "./Subscriptions";
import Messages from "./Messages";
import Reviews from "./Reviews";
import Requests from "./Requests";
import Discounts from "./Discounts";
import Navbar  from "./Navbar";
import { Sidebar } from "lucide-react";

const AdminRoutes = ({ isAdmin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAdmin) return <Navigate to="/" />; // Redirect non-admin users

  const menuItems = [
    { name: "Dashboard", icon: <FaClipboardList />, path: "/admin" },
    { name: "Posts", icon: <FaClipboardList />, path: "/admin/posts" },
    { name: "Packages", icon: <FaTags />, path: "/admin/packages" }, // <-- points to AdminPricing
    { name: "Subscriptions", icon: <FaEnvelope />, path: "/admin/subscriptions" },
    { name: "Messages", icon: <FaCommentDots />, path: "/admin/messages" },
    { name: "Reviews", icon: <FaStar />, path: "/admin/reviews" },
    { name: "Custom Requests", icon: <FaHammer />, path: "/admin/custom-requests" },
  ];

  return (
    <div className="flex min-h-screen bg-dark text-white">
      {/* Sidebar */}
      <aside className={`bg-gray-900 border-r border-gray-700 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className={`font-bold text-lg ${!sidebarOpen && "hidden"}`}>Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-gray-800"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="mt-4 flex flex-col">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 hover:bg-gray-800 transition ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/packages" element={<AdminPricing />} /> {/* <-- AdminPricing route */}
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/discounts" element={<Discounts />} />  
          <Route path="/navbar" element={<Navbar />} />   
          <Route path="/sidebar" element={<Sidebar />} />     
        </Routes>
      </main>
    </div>
  );
};

export default AdminRoutes;
