import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-800 p-4">
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="mb-6 text-lg">Thank you for your purchase. We'll start processing your request shortly.</p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Success;
