import { NavLink } from "react-router-dom";
import { FaHome, FaNewspaper, FaTags, FaGift, FaStar, FaEnvelope, FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/admin" },
    { name: "Posts", icon: <FaNewspaper />, path: "/admin/posts" },
    { name: "Packages", icon: <FaTags />, path: "/admin/packages" },
    { name: "Discounts", icon: <FaGift />, path: "/admin/discounts" },
    { name: "Reviews", icon: <FaStar />, path: "/admin/reviews" },
    { name: "Subscriptions", icon: <FaEnvelope />, path: "/admin/subscriptions" },
    { name: "Messages", icon: <FaClipboardList />, path: "/admin/messages" },
    { name: "Requests", icon: <FaClipboardList />, path: "/admin/requests" },
  ];

  return (
<aside className={`bg-gray-900 border-r border-gray-700 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}>
  <div className="flex justify-between items-center p-4 border-b border-gray-700">
    <h1 className={`font-bold text-lg ${!sidebarOpen && "hidden"}`}>Admin</h1>
    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded hover:bg-gray-800">
      {sidebarOpen ? "◀" : "▶"}
    </button>
  </div>
  <nav className="mt-4 flex flex-col gap-1">
    {menuItems.map(item => (
      <NavLink
        key={item.name}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 hover:bg-gray-800 transition rounded ${isActive ? "bg-gray-700" : ""}`
        }
      >
        <span className="text-xl">{item.icon}</span>
        {sidebarOpen && <span>{item.name}</span>}
      </NavLink>
    ))}
  </nav>
</aside>

  );
};

export default Sidebar;
