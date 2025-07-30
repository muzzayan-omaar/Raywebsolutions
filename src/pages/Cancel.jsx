import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800 p-4">
      <h1 className="text-4xl font-bold mb-4">❌ Payment Cancelled</h1>
      <p className="mb-6 text-lg">It looks like the payment didn’t go through.</p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow"
      >
        Try Again
      </Link>
    </div>
  );
};

export default Cancel;
