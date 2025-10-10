import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Subscriptions = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch subscribers
  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter`);
      const data = await res.json();
      if (res.ok) {
        setSubscribers(data);
      } else {
        toast.error(data.message || "Failed to fetch subscribers");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // ✅ Delete subscriber
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Subscriber deleted");
        setSubscribers((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error(data.message || "Failed to delete subscriber");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Newsletter Subscribers</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-gray-400">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4 shadow">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-700 text-gray-300">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Subscribed At</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s._id} className="border-b border-gray-800 hover:bg-white/5">
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">
                    {new Date(s.subscribedAt).toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
