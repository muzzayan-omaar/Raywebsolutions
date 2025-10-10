import { useState, useEffect } from "react";
import axios from "axios";

const Subscriptions = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get("https://rayweb-backend.onrender.com/api/newsletter");
        setSubscribers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Subscribers</h2>
      <ul className="space-y-2">
        {subscribers.map((sub, idx) => (
          <li key={idx} className="p-3 bg-gray-800 rounded flex justify-between items-center">
            <span>{sub.email}</span>
            <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500">
              Send Email
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;
