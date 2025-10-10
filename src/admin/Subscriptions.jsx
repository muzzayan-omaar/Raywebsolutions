import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Subscriptions = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get("https://rayweb-backend.onrender.com/api/newsletter");
        setSubscribers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch subscribers.");
      }
    };

    fetchSubscribers();
  }, []);

  // Delete subscriber
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      await axios.delete(`https://rayweb-backend.onrender.com/api/admin/newsletter/${id}`);
      setSubscribers(prev => prev.filter(sub => sub._id !== id));
      toast.success("Subscriber deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete subscriber.");
    }
  };

  // Placeholder for sending email
  const handleSendEmail = (email) => {
    // TODO: integrate email sending via backend or emailjs
    toast("Send email to: " + email);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Subscribers</h2>

      {subscribers.length === 0 ? (
        <p className="text-gray-400">No subscribers yet.</p>
      ) : (
        <ul className="space-y-2">
          {subscribers.map((sub) => (
            <li
              key={sub._id}
              className="p-3 bg-gray-800 rounded flex justify-between items-center"
            >
              <span>{sub.email}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSendEmail(sub.email)}
                  className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
                >
                  Send Email
                </button>
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="px-3 py-1 bg-red-500 rounded hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Subscriptions;
