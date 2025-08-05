import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] text-white">
      <div className="bg-[#1e293b] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 max-w-md w-full text-center transform transition-all duration-300">
        <h1 className="text-3xl font-bold mb-4 text-green-400">✅ Payment Successful</h1>
        <p className="text-gray-300 mb-6">
          Thank you! Your payment was received and your order is being processed.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
