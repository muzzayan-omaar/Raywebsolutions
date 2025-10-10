import React from "react";

const sampleDiscounts = [
  { id: 1, title: "Starter Package Discount", duration: "Aug 20 - Aug 30", value: "10%" },
  { id: 2, title: "Pro Package Special", duration: "Sep 01 - Sep 10", value: "15%" },
];

const Discounts = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Manage Discounts</h2>
      {sampleDiscounts.map((d) => (
        <div
          key={d.id}
          className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-white font-medium">{d.title}</p>
            <p className="text-gray-400">{d.duration}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-green-400">{d.value}</span>
            <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500">
              Edit
            </button>
            <button className="px-3 py-1 bg-red-600 rounded hover:bg-red-500">
              Delete
            </button>
          </div>
        </div>
      ))}
      <button className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-500">
        Add Discount
      </button>
    </div>
  );
};

export default Discounts;
