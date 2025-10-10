import React from "react";
import { FaStar } from "react-icons/fa";

const sampleReviews = [
  { id: 1, user: "Alice", rating: 5, comment: "Excellent work!" },
  { id: 2, user: "Bob", rating: 4, comment: "Very good service" },
];

const Reviews = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {sampleReviews.map((review) => (
        <div
          key={review.id}
          className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-white font-medium">{review.user}</p>
            <p className="text-yellow-400">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </p>
            <p className="text-gray-300 mt-1">{review.comment}</p>
          </div>
        </div>
      ))}
      <button className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-500">
        Add New Review
      </button>
    </div>
  );
};

export default Reviews;
