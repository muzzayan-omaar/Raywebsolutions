import React from "react";

const sampleRequests = [
  { id: 1, name: "Client A", project: "Custom eCommerce", status: "Pending" },
  { id: 2, name: "Client B", project: "Landing Page", status: "In Progress" },
];

const Requests = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">New Build Requests</h2>
      {sampleRequests.map((req) => (
        <div
          key={req.id}
          className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-white font-medium">{req.name}</p>
            <p className="text-gray-300">{req.project}</p>
          </div>
          <span className="px-3 py-1 bg-yellow-500 rounded">{req.status}</span>
        </div>
      ))}
    </div>
  );
};

export default Requests;
