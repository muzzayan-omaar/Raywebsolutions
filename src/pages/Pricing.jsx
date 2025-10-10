import { useState, useEffect } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const Pricing = () => {
  const [packages, setPackages] = useState([]);
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          "https://rayweb-backend.onrender.com/api/admin/packages"
        );
        const data = Array.isArray(res.data) ? res.data : res.data.packages;
        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setPackages([]);
      }
    };
    fetchPackages();
  }, []);

  // Hardcoded FAQs
  const faqs = [
    {
      question: "Can I upgrade my package later?",
      answer:
        "Yes! You can always upgrade your plan. We'll adjust pricing based on what's already been delivered.",
    },
    {
      question: "What platforms do you build with?",
      answer:
        "We use modern stacks like React and Next.js. For eCommerce, we offer Shopify or a custom CMS-based store.",
    },
    {
      question: "How do I request a custom plan?",
      answer:
        "Click the 'Request Custom Plan' button above or contact us directly through the contact page.",
    },
    {
      question: "Do I own the website after delivery?",
      answer:
        "Absolutely. Once it's delivered, it's 100% yours including the code and content.",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-10 bg-dark text-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Pricing Packages</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose a package that fits your business needs. All packages include responsive design, fast
          delivery, and premium support.
        </p>
      </motion.div>

      {/* Packages */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 flex-wrap">
        {packages
          .filter((pkg) => pkg.name.toLowerCase() !== "custom") // exclude custom plan if it's in backend
          .slice()
          .sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1)) // popular first
          .map((pkg, index) => {
            const mainFeatures = pkg.features?.slice(0, 4) || [];
            const otherFeatures = pkg.features?.slice(4) || [];

            const former = Number(pkg.formerPrice) || 0;
            const current = Number(pkg.price) || 0;
            const savings = former > current ? `Save AED ${former - current}` : null;

            return (
              <motion.div
                key={pkg._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative w-full md:w-[300px] ${
                  pkg.popular ? "md:w-[340px] scale-105 z-10" : ""
                } bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-105`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-semibold shadow">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>

                {/* Former Price */}
                {former > 0 && (
                  <div className="text-sm text-gray-400 line-through mb-1">{`AED ${former}`}</div>
                )}

                {/* Price */}
                <p className="text-3xl font-bold text-primary mb-2">{`AED ${current}`}</p>

                {/* Savings */}
                {savings && (
                  <div className="inline-block bg-green-500 text-black px-2 py-1 rounded-full text-xs font-semibold mb-4">
                    {savings}
                  </div>
                )}

                {/* Main Features */}
                <div className="max-h-40 overflow-y-auto space-y-2 text-sm">
                  {mainFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Collapsible Other Features */}
                {otherFeatures.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        setOpenCardIndex(openCardIndex === pkg._id ? null : pkg._id)
                      }
                      className="flex items-center gap-1 text-primary hover:underline text-sm mt-2"
                    >
                      {openCardIndex === pkg._id
                        ? "Hide Other Features"
                        : "Show Other Features"}
                      {openCardIndex === pkg._id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                    {openCardIndex === pkg._id && (
                      <div className="mt-2 text-sm space-y-1 text-gray-300 max-h-36 overflow-y-auto">
                        {otherFeatures.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-blue-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <Link
                  to={`/templates/${pkg.name.toLowerCase()}`}
                  className="w-full inline-block mt-6 bg-primary text-black py-2 rounded-full text-center font-semibold hover:bg-sky-400 transition"
                >
                  View Templates
                </Link>
              </motion.div>
            );
          })}

        {/* Custom Plan always last */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full md:w-[300px] bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 rounded-2xl p-6 shadow-xl text-center"
        >
          <h3 className="text-xl font-semibold mb-2 text-white">
            Need Something Custom?
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Not sure which package fits your business? Let's create a custom plan tailored to your needs.
          </p>
          <button className="w-full mt-4 bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Request Custom Plan
          </button>
        </motion.div>
      </div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-20"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">FAQs</h3>
        {faqs.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-white/10 py-4 cursor-pointer"
              onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">{faq.question}</h4>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {isOpen && <p className="text-sm text-gray-400 mt-2">{faq.answer}</p>}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Pricing;
