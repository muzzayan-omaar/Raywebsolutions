import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


const Subscriptions = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [htmlBody, setHtmlBody] = useState("");
  const [sending, setSending] = useState(false);
  const [log, setLog] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("custom");

  // Brand footer/logo
  const BRAND_FOOTER = `
    <hr style="margin-top:30px;border:none;border-top:1px solid #ddd;">
    <div style="text-align:center;padding-top:10px;">
      <img src="https://res.cloudinary.com/dtqp8n2jw/image/upload/v1730380800/raywebsolutions-logo-blue.png" 
           alt="RayWebSolutions Logo" 
           style="width:80px;height:auto;margin-bottom:6px;">
      <p style="font-size:12px;color:#888;">RayWebSolutions · Crafted with 💙 in UAE</p>
    </div>
  `;

  // Email templates
  const templates = {
    custom: "",
    update: `
      <h2>🚀 Exciting Updates from RayWebSolutions!</h2>
      <p>We’ve added new features and improved performance. Visit our site to explore more.</p>
    `,
    promo: `
      <h2>🔥 Special Offer Just for You!</h2>
      <p>Get 20% off all web design packages this week only. Use code <b>RAY20</b>.</p>
    `,
    tips: `
      <h2>💡 Weekly Web Tips</h2>
      <p>Consistency in design = trust in your brand. Stay tuned for more insights every week!</p>
    `
  };

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
    setSelectedEmails(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
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

  const handleTemplateChange = (e) => {
    const key = e.target.value;
    setSelectedTemplate(key);
    setHtmlBody(templates[key]);
  };

  const sendNewsletter = async () => {
    if (!subject || !htmlBody) return toast.error("Subject and content required.");
    setSending(true);
    try {
      const res = await axios.post("https://rayweb-backend.onrender.com/api/newsletter/send", {
        subject,
        htmlBody: htmlBody + BRAND_FOOTER,
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
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">📬 Newsletter Manager</h2>

      {/* Subscribers List */}
      <div className="bg-gray-800 rounded-lg p-4 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg text-white">Subscribers ({subscribers.length})</h3>
          <button
            onClick={fetchSubscribers}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
          >
            Refresh
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {subscribers.map(sub => (
            <div
              key={sub._id}
              className="flex justify-between items-center bg-gray-700 px-3 py-2 rounded"
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(sub.email)}
                  onChange={() => toggleEmail(sub.email)}
                />
                <span className="text-gray-200">{sub.email}</span>
              </label>
              <button
                onClick={() => handleDelete(sub._id)}
                className="px-2 py-1 bg-red-600 rounded hover:bg-red-500 text-white text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Composer */}
      <div className="bg-gray-800 rounded-lg p-4 shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-white">Compose Newsletter</h3>
          <select
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="bg-gray-700 text-white rounded px-2 py-1"
          >
            <option value="custom">📝 Custom</option>
            <option value="update">🚀 Update</option>
            <option value="promo">🔥 Promotion</option>
            <option value="tips">💡 Tips</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Newsletter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded"
        />

        <ReactQuill
          theme="snow"
          value={htmlBody}
          onChange={setHtmlBody}
          className="bg-white rounded text-black"
          placeholder="Write your newsletter content..."
        />

        <button
          onClick={sendNewsletter}
          disabled={sending}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          {sending ? "Sending..." : "Send Newsletter"}
        </button>
      </div>

      {/* Logs */}
      {log.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-lg text-white mb-2">Send Log</h3>
          <ul className="text-sm text-gray-300 space-y-1 max-h-60 overflow-y-auto">
            {log.map((item, i) => (
              <li key={i}>
                {item.email} - {item.status}
                {item.error && <span className="text-red-400"> (Error: {item.error})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
