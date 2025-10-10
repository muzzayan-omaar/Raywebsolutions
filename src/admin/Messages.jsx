import React from "react";

const sampleMessages = [
  { id: 1, name: "John Doe", message: "I need a website", email: "john@example.com" },
  { id: 2, name: "Jane Smith", message: "Pricing question", email: "jane@example.com" },
];

const Messages = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      {sampleMessages.map((msg) => (
        <div
          key={msg.id}
          className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-white font-medium">{msg.name}</p>
            <p className="text-gray-400">{msg.email}</p>
            <p className="text-gray-300 mt-1">{msg.message}</p>
          </div>
          <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500">
            Reply
          </button>
        </div>
      ))}
    </div>
  );
};

export default Messages;
