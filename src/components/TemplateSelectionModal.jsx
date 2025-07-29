import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const industries = [
  "Technology", "Restaurant", "Fashion", "Finance",
  "Healthcare", "Education", "Real Estate", "E-commerce",
];

const TemplateSelectionModal = ({ template, plan, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    industry: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateStep = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.industry) newErrors.industry = "Select an industry";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/checkout`, {
        name: template.title,
        amount: plan === "Premium" ? 100 : 50, // or however you price
        customer: formData,
        templateId: template.id,
        plan,
      });

      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
      <div className="bg-[#0b1120] text-white max-w-5xl w-full rounded-xl shadow-lg flex overflow-hidden relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full z-10"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Left: Image */}
        <div className="hidden md:block w-1/2 bg-black">
          <img
            src={template.image}
            alt={template.title}
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right: Steps */}
        <div className="w-full md:w-1/2 p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">
                  Confirm Template Selection
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                  You have selected: <strong>{template.title}</strong> under the <strong>{plan}</strong> plan.
                </p>
                <button
                  onClick={() => setStep(2)}
                  className="bg-sky-600 hover:bg-sky-500 transition text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Company Details</h2>

                <div className="space-y-4">
                  <div>
                    <input
                      name="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Industry</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="text-red-500 text-sm">{errors.industry}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2 rounded bg-gray-600 hover:bg-gray-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Schedule Confirmation</h2>
                <p className="text-sm text-gray-300 mb-4">
                  You’ll be redirected to our secure payment gateway to make a small deposit and confirm the start of development.
                </p>

                <div className="space-y-2 text-sm text-gray-400">
                  <p><strong>Company:</strong> {formData.companyName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Industry:</strong> {formData.industry}</p>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2 rounded bg-gray-600 hover:bg-gray-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className={`px-5 py-2 rounded bg-green-600 hover:bg-green-500 text-white font-semibold shadow ${loading ? "opacity-50" : ""}`}
                  >
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;
