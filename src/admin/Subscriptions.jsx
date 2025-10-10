import React from "react";

const sampleEmails = [
  "user1@example.com",
  "user2@example.com",
  "user3@example.com",
];

const Subscriptions = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Subscribers</h2>
      <ul className="space-y-2">
        {sampleEmails.map((email, idx) => (
          <li
            key={idx}
            className="p-3 bg-gray-800 rounded flex justify-between items-center"
          >
            <span>{email}</span>
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
