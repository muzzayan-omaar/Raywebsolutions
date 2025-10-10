import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Subscriptions = () => {
  const [subscribers, setSubscribers] = useState([]);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get("https://rayweb-backend.onrender.com/api/newsletter");
      setSubscribers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch subscribers.");
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this subscriber?")) return;
    try {
      await axios.delete(`https://rayweb-backend.onrender.com/api/newsletter/${id}`);
      toast.success("Subscriber removed.");
      fetchSubscribers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove subscriber.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Subscribers</h2>
      <ul className="space-y-2">
        {subscribers.map((sub) => (
          <li key={sub._id} className="p-3 bg-gray-800 rounded flex justify-between items-center">
            <span>{sub.email}</span>
            <button
              onClick={() => handleDelete(sub._id)}
              className="px-3 py-1 bg-red-600 rounded hover:bg-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;
