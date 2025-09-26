import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const responses = {
  greetings: ["hi", "hello", "hey", "good morning", "good evening"],
  pricing: ["pricing", "price", "cost", "plan", "package"],
  projects: ["projects", "portfolio", "work", "samples"],
  help: ["help", "how", "start", "new"],
};

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages([{ from: "user", text: userMsg }]); // replace old chat
    setInput("");

    const lower = userMsg.toLowerCase();
    let reply = null;

    if (responses.greetings.some((word) => lower.includes(word))) {
      reply =
        "👋 Hello! Hope you’re doing great. You can ask me about pricing, projects, or how to get started!";
    } else if (responses.pricing.some((word) => lower.includes(word))) {
      reply = (
        <span>
          💰 Our websites can be from as low as <b>AED 790</b>, with outstanding perks included!  
          <br />
          👉 For details, check our{" "}
          <Link
            to="/pricing"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Pricing Page
          </Link>
          .
        </span>
      );
    } else if (responses.projects.some((word) => lower.includes(word))) {
      reply = (
        <span>
          📂 We have a wide selection of projects, from business websites, eCommerce shops, and personal portfolios.  
          <br />
          👉 Explore them here:{" "}
          <Link
            to="/projects"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Our Projects
          </Link>
          .
          <br />
          💡 Are you new to all this? Click below to learn the process!
          <div className="mt-2">
            <button
              onClick={() =>
                setMessages([
                  {
                    from: "bot",
                    text: (
                      <span>
                        ✨ No worries! We guide you step by step:
                        <br />1️⃣ Choose a package (starting at AED 790).  
                        <br />2️⃣ We design and build your site.  
                        <br />3️⃣ You review and launch.  
                        <br />🚀 That’s it!  
                        <br />
                        👉{" "}
                        <Link
                          to="/packages"
                          className="text-blue-400 underline hover:text-blue-300"
                        >
                          Get Started Here
                        </Link>
                        .
                      </span>
                    ),
                  },
                ])
              }
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
            >
              I’m New – Explain
            </button>
          </div>
        </span>
      );
    } else {
      reply =
        "😅 Sorry, I didn’t get that. Try asking about pricing, projects, or how to start!";
    }

    setTimeout(() => {
      setMessages([{ from: "bot", text: reply }]); // replace with bot response
    }, 600);
  };

  return (
    <div>
      {/* Floating Button on Left */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-6 w-80 bg-gray-900 text-white rounded-2xl shadow-xl z-50 flex flex-col"
          >
            <div className="p-3 border-b border-gray-700 font-semibold">
              💬 RayWeb Assistant
            </div>

            {/* Latest Message Only */}
            <div className="flex-1 p-3 text-sm">
              {messages.length > 0 && (
                <div
                  className={`p-3 rounded-lg ${
                    messages[0].from === "user"
                      ? "bg-blue-600 text-right"
                      : "bg-gray-800 text-left"
                  }`}
                >
                  {messages[0].text}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-2 border-t border-gray-700 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-md text-sm outline-none"
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-blue-600 p-2 rounded-md hover:bg-blue-700"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatAssistant;
