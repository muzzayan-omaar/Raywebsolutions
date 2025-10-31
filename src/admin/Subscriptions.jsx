import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Trash2, Send, Users } from "lucide-react";

const Subscriptions = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [htmlBody, setHtmlBody] = useState("");
  const [sending, setSending] = useState(false);
  const [log, setLog] = useState([]);

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

  const toggleEmail = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

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

  const sendNewsletter = async () => {
    if (!subject || !htmlBody) return toast.error("Subject and content required.");
    setSending(true);
    try {
      const res = await axios.post("https://rayweb-backend.onrender.com/api/newsletter/send", {
        subject,
        htmlBody,
        recipientEmails: selectedEmails.length === 0 ? "all" : selectedEmails,
      });
      setLog(res.data.results);
      toast.success("Newsletter sent!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send newsletter.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 space-y-8 text-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-400" />
          Subscribers & Newsletter
        </h2>
        <span className="text-sm text-gray-400">
          Total Subscribers: {subscribers.length}
        </span>
      </div>

      {/* Subscriber List */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 shadow-sm">
        <h3 className="text-lg font-medium mb-3">Subscriber List</h3>

        <div className="max-h-64 overflow-y-auto divide-y divide-gray-700">
          {subscribers.length === 0 ? (
            <p className="text-gray-400 text-sm italic py-4 text-center">
              No subscribers yet.
            </p>
          ) : (
            subscribers.map((sub) => (
              <div
                key={sub._id}
                className="flex justify-between items-center py-2 hover:bg-gray-700/40 px-2 rounded-md transition"
              >
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={selectedEmails.includes(sub.email)}
                    onChange={() => toggleEmail(sub.email)}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{sub.email}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </label>
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="p-1.5 rounded hover:bg-red-600/20 text-red-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Newsletter Composer */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 space-y-3">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-400" /> Compose Newsletter
        </h3>
        <input
          type="text"
          placeholder="Newsletter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-gray-900/70 border border-gray-700 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Write your message (HTML supported)"
          value={htmlBody}
          onChange={(e) => setHtmlBody(e.target.value)}
          className="w-full h-40 bg-gray-900/70 border border-gray-700 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Sending to:{" "}
            <strong>
              {selectedEmails.length === 0
                ? "All Subscribers"
                : `${selectedEmails.length} Selected`}
            </strong>
          </p>
          <button
            onClick={sendNewsletter}
            disabled={sending}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Send className="w-4 h-4" />
            {sending ? "Sending..." : "Send Newsletter"}
          </button>
        </div>
      </div>

      {/* Send Log */}
      {log.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4">
          <h3 className="text-lg font-medium mb-3">Send Log</h3>
          <div className="max-h-64 overflow-y-auto text-sm divide-y divide-gray-700">
            {log.map((item, i) => (
              <div key={i} className="py-1 flex justify-between">
                <span>{item.email}</span>
                <span
                  className={
                    item.status === "sent"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
